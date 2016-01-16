import PlantCollection from './models/plant-collection';

let plants;

export default {
	getPlantCollection() {
		return (plants = plants || new PlantCollection())
	}

}