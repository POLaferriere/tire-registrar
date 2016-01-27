import PlantCollection from './models/plant-collection';
import VinCollection from './models/vin-collection';
import TireCollection from './models/tire-collection';

let plants, vins, tires;

export default {
	getPlantCollection() {
		return (plants = plants || new PlantCollection())
	},

	getVINCollection() {
		return (vins = vins || new VinCollection())
	},

	addVIN(model) {
		return new Promise(function(resolve, err) {
			vins.create(model, {
				success: (model, response) => {
					resolve(response);
				}
			});
		})
	},

	getTireCollection() {
		return (tires = tires || new TireCollection())
	},

}