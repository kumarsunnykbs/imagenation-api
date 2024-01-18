const propertiesModel = require('../models/properties');
const userPreferencesModel = require('../models/userPropertyPreferences');
const axios = require('axios');
const dotenv = require('dotenv');
const {QueryTypes} = require('sequelize');

dotenv.config();


class PropertyService {
	/** ***** Property Service: Method to fetch properties based upon the user request filters  ******/
	async fetchProperty(req, res, next) {
		try {
			const id = req.decoded.id;
			const price = req.body.price ? req.body.price.split('-') : '';

			/* request parameters */
			const reqParams = {
				state_code: req.body.state_code,
				city: req.body.city,
				offset: req.body.offset ?? 0,
				limit: req.body.limit ?? 200,
				sort: req.body.sort ?? 'relevance',
				radius: req.body.radius ?? '',
				lat_max: req.body.lat_max ?? '',
				lng_max: req.body.lng_max ?? '',
				price_min: price[0] ?? 0,
				price_max: price[1] ?? 0,
				baths_min: req.body.baths_min ?? 0,
				beds_min: req.body.beds_min ?? 0,
				userId: req.body.userId ?? 0,
				story_min: req.body.story_min ?? 0,
				story_max: req.body.story_max ?? 0,
			};
			const queryParams = {
				state_code: req.body.state_code,
				city: req.body.city,
				offset: req.body.offset ?? 0,
				limit: req.body.limit ?? 200,
				sort: req.body.sort ?? 'relevance',
				radius: req.body.radius ?? '',
				lat_max: req.body.lat_max ?? '',
				lng_max: req.body.lng_max ?? '',
				price_min: price[0] ?? '',
				price_max: price[1] ?? '',
				baths_min: req.body.baths_min ?? '',
				beds_min: req.body.beds_min ?? '',
				userId: req.body.userId ?? '',
				story_min: req.body.story_min ?? '',
				story_max: req.body.story_max ?? '',
			};

			let query = `SELECT * FROM (SELECT *, (((acos(sin(( ${queryParams.lat_max} * pi() / 180))*sin(( lat_request * pi() / 180)) + cos(( ${queryParams.lat_max} * pi() /180 ))*cos(( lat_request * pi() / 180)) * cos((( ${queryParams.lng_max} - long_request) * pi()/180)))) * 180/pi()) * 60 * 1.1515)as distance FROM properties) myTable WHERE distance <= ${queryParams.radius}`;

			/* filter for price*/
			if (queryParams.price_min && queryParams.price_max) {
				query = `${query} AND (price BETWEEN ${queryParams.price_min} AND ${queryParams.price_max})`;
			}
			/* filter for bathrooms*/
			if (queryParams.baths_min) {
				query = `${query} AND baths = ${queryParams.baths_min}`;
			}
			/* filter for bedrooms*/
			if (queryParams.beds_min) {
				query = `${query} AND  beds = ${queryParams.beds_min}`;
			}
			const queryRes = await sequelize.query(
				query,
				{
					replacements: {},
					type: QueryTypes.SELECT,
				},
			);
			/* check if user is already have its preferences*/
			const uData = await userPreferencesModel.findOne({where: {userId: id}});
			/* data object for user preferences */
			const dataToCreate = {
				userId: id,
				priceMin: reqParams.price_min ?? 0,
				priceMax: reqParams.price_max ?? 0,
				storyMin: reqParams.story_min ?? 0,
				storyMax: reqParams.story_max ?? 0,
				latitude: reqParams.lat_max ?? '',
				longitude: reqParams.lng_max ?? '',
				bathroom: reqParams.baths_min ?? 0,
				bedroom: reqParams.beds_min ?? 0,
				propertyType: reqParams.prop_type ?? 'Others',
			};
			/* if user have not its preferences yet then we add its preferences with dataToCreate object values */
			if (!uData) {
				await userPreferencesModel.create(dataToCreate);
			} else {
				/* if user have already  its preferences  then we update its preferences with dataToCreate object values */
				await userPreferencesModel.update(dataToCreate, {where: {userId: id}});
			}
			if (queryRes.length >= 10) {
				return res.status(200).json({status: true, message: 'Properties List', result: queryRes});
			} else {
				const options = {
					method: 'GET',
					url: 'https://realty-in-us.p.rapidapi.com/properties/list-for-sale',
					params: queryParams,
					headers: {
						'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
						'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
					},
				};
				let responseData = '';
				await axios.request(options).then(function(response) {
					responseData = response.data.listings;
				}).catch(function(error) {
					console.error(error);
				});
				/* pass the response data and request parameters to mapApiResponse function */
				const result = await this.mapApiResponse(responseData, queryParams);
				return res.status(200).json({status: true, message: 'Properties List', result: result});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: error});
		}
	}
	/* function for map api response */
	async mapApiResponse(apiRes, params) {
		const arr = [];
		apiRes.forEach(function(element) {
			/* assign data to keys of object that is passed to create method of sequelize */
			const obj = {
				property_id: element.property_id ?? '',
				listing_id: element.listing_id ?? '',
				products: element.products ?? '',
				rdc_web_url: element.rdc_web_url ?? '',
				prop_type: element.prop_type ?? '',
				prop_sub_type: element.prop_sub_type,
				address: element.address_new,
				latitude: element.address_new?.lat ?? '',
				longitude: element.address_new?.lon ?? '',
				lat_request: params.lat_max ?? '',
				long_request: params.lng_max ?? '',
				branding: element.branding ?? '',
				prop_status: element.prop_status ?? 'for_sale',
				price: parseFloat(element.price.replace('$', '').replace(',', '')) ?? '',
				baths_half: element.baths_half ?? 0,
				baths_full: element.baths_full ?? 0,
				baths: element.baths ?? 0,
				beds: element.beds ?? 0,
				agents: element.agents ?? '',
				office: element.office_name ?? '',
				last_update: element.last_update ?? '',
				client_display_flags: element.client_display_flags ?? '',
				lead_forms: element.lead_forms ?? '',
				photo_count: element.photo_count ?? '',
				page_no: element.page_no ?? '',
				rank: element.rank ?? '',
				list_tracking: element.list_tracking ?? '',
				mls: element.mls ?? '',
				data_source_name: element.data_source_name ?? '',
				thumbnail: element.photo ?? '',
				isFavourite: 0,
				transactionType: 'Sale',
			};
			arr.push(obj);
		});
		/* created properties add method for add properties data in properties table */
		await propertiesModel.bulkCreate(arr,
			{
				/* check for duplicate entries,if found duplicate then update its fields only */
				fields: ['id', 'property_id', 'listing_id', 'products', 'rdc_web_url', 'prop_type', 'prop_sub_type', 'address', 'latitude', 'longitude', 'lat_request', 'long_request', 'branding', 'prop_status', 'price', 'baths_half', 'baths_full', 'baths', 'beds', 'agents', 'office', 'last_update', 'client_display_flags', 'lead_forms', 'photo_count', 'page_no', 'rank', 'list_tracking', 'mls', 'data_source_name', 'thumbnail', 'isFavourite', 'transactionType', 'sqft', 'lot_size'],
				updateOnDuplicate: ['property_id'],
			},
		).then(function(response) {
		}).catch(function(error) {
			console.error(error);
		});
		return arr;
	}
	/* function for propertyDetail api */
	async propertiesDetail(req, res, next) {
		try {
			/* parameters object pass to property detail api */
			const detailParams = {
				listing_id: req.body.listing_id ?? '',
				prop_status: req.body.prop_status ?? '',
				property_id: req.body.property_id ?? '',
			};
			/* sequelize method for find a record with detailParams */
			const properties = await propertiesModel.findOne({
				where: {
					property_id: detailParams.property_id,
					prop_status: detailParams.prop_status,
					listing_id: detailParams.listing_id,
				},
			});
			if (!properties.propertyOverview) {
				const options = {
					method: 'GET',
					url: 'https://realty-in-us.p.rapidapi.com/properties/detail',
					params: detailParams,
					headers: {
						'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
						'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
					},
				};
				const detailRespData = await axios.request(options);
				const listingDetailData = detailRespData.data.listing;

				let pSqft = listingDetailData.sqft ?? 0;
				pSqft = (pSqft != null || pSqft != 'null') ? pSqft : 0;

				let sqftLot = listingDetailData.lot_sqft ?? 0;
				sqftLot = (sqftLot != null || sqftLot != 'null') ? sqftLot : 0;

				await propertiesModel.update({
					agent: listingDetailData.agent ?? '', broker: listingDetailData.broker ?? '', photos: listingDetailData.photos ?? '', propertyOverview: listingDetailData.description ?? '',
					sqft: pSqft, lot_size: sqftLot,
				}, {
					where: {
						property_id: detailParams.property_id,
					},
				});
				const updatedProp = await propertiesModel.findOne({
					where: {
						property_id: detailParams.property_id,
						listing_id: detailParams.listing_id,
					},
				});
				return res.status(200).json({status: true, message: 'Property detail', result: updatedProp});
			} else {
				return res.status(200).json({status: true, message: 'Property detail', result: properties});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: error});
		}
	}
}

module.exports = new PropertyService();
