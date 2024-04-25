import {EventSchema, UserSchema} from "../db/models/index";
import FilteringBuilder from "./FilteringBuilder";
import { getDayTimestamp } from "../utils/getDayTimestamp";

export default class FeedService {
	static async getFeedList(userID, filterData, {limit, page}) {
		const filterOBJ = new FilteringBuilder()
			.addFeedFilterEvent("category", filterData.categories)
			.addFeedFilterEvent("peopleWanted", filterData.peopleWanted)
			.addFeedFilterEvent("city", filterData.city)
			// .addFeedFilterEvent("dateStart", filterData.dateStart)
			.addFeedFilterUser('languages', filterData.languages)
			.addFeedFilterUser('birthday', {
				$lte: filterData.minAge ? new Date().getTime() - filterData.minAge * 365 * 24 * 3600 * 1000 : undefined,
				$gte: filterData.maxAge ? new Date().getTime() - filterData.maxAge * 365 * 24 * 3600 * 1000 : undefined,
			})

		const user = await UserSchema.findById(userID).exec();
		const timestamp = getDayTimestamp();
		return await EventSchema.paginate({
			author: { 
				$ne: userID
			},
			_id: {
				$nin: [...user.sentEvents, ...user.appliedEvents, ...user.deniedEvents],
			},
			$and: [
				{
					$or: [
						{
							dateStart: null,
						},
						{
							dateStart: {
								$gte: timestamp
							}
						},
					]
				},
				{
					$or: [
						{
							dateEnd: null,
						},
						{
							dateEnd: {
								$gte: timestamp
							}
						},
					]
				}
			],
			...filterOBJ.eventFilter,
		}, {
			sort: "-updateDate",
			limit,
			select: ["-__v"],
			page,
			populate: [
				{
					path: "author",
					match: {
						...filterOBJ.userFilter
					},
					select: ["-password", "-__v", '-events'],
				},
				{
					path: "category",
					select: ["-__v"],
				}
			],
		}, (err, res) => {
			return {...res, docs: res.docs.filter(doc => doc.author)};
		});
	}

	static async getFeedMap(userID, filterData) {
		const filterOBJ = new FilteringBuilder()
			.addFeedFilterEvent('category', filterData.categories)
			.addFeedFilterEvent('peopleWanted', filterData.peopleWanted)
			.addFeedFilterEvent('city.placeId', filterData.placeId)
			.addFeedFilterUser('languages', filterData.languages)
			.addFeedFilterUser('birthday', {
				$lte: filterData.minAge ? new Date().getTime() - filterData.minAge * 365 * 24 * 3600 * 1000 : undefined,
				$gte: filterData.maxAge ? new Date().getTime() - filterData.maxAge * 365 * 24 * 3600 * 1000 : undefined,
			})

		const user = await UserSchema.findById(userID).exec();
		const timestamp = getDayTimestamp();

		return await EventSchema.find({
			author: {
				$ne: userID
			},
			_id: {
				$nin: [...user.deniedEvents],
			},
			$and: [
				{
					$or: [
						{
							dateStart: null,
						},
						{
							dateStart: {
								$gte: timestamp
							}
						},
					]
				},
				{
					$or: [
						{
							dateEnd: null,
						},
						{
							dateEnd: {
								$gte: timestamp
							}
						},
					]
				}
			],
			...filterOBJ.eventFilter
		}).populate({
			path: "author",
			match: {
				...filterOBJ.userFilter
			},
			select: ["-password", "-__v", '-events'],
		}).populate({
			path: "category",
			select: ["-__v"],
		})
		.select({
			'__v': 0
		})
		.exec();

		// { $addFields: {
		// 	showBtn: {
		// 		$switch: {
		// 			branches: [
		// 				{
		// 					case: { $in: ["_id", [...user.sentEvents, ...user.appliedEvents]] },
		// 					then: false
		// 				}
		// 			],
		// 		default: true
		// 		}
		// 	}}
		// }
	}
}