import apiClient from '../../apiClient';

export default class AddressService {
    constructor() {
        this.BASE_URL = '/addresses';
    }

    async getAllCounties() {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/counties`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching counties');
        }
    }

    async getCountyById(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/counties/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching counties with ID: ${id}`);
        }
    }

    async getSubCountiesByCountyId(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/counties/${id}/subcounties`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-counties with County ID: ${id}`);
        }
    }

    async getAllLocations() {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/locations`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching locations');
        }
    }

    async getLocationById(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/locations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching location with ID: ${id}`);
        }
    }

    async getLocationsBySubCountyId(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/subcounties/${id}/locations`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations for sub-county ID: ${id}`);
        }
    }

    async getSubLocationsByLocationId(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/locations/${id}/sublocations`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-locations for location ID: ${id}`);
        }
    }

    async getAllSubLocations() {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/sublocations`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching sub-locations');
        }
    }

    async getSubLocationById(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/sublocations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-location with ID: ${id}`);
        }
    }

    async getVillagesBySubLocationId(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/sublocations/${id}/villages`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching villages for sub-location ID: ${id}`);
        }
    }

    async getAllVillages() {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/villages`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching villages');
        }
    }

    async getVillageById(id) {
        try {
            const response = await apiClient.get(`${this.BASE_URL}/villages/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching village with ID: ${id}`);
        }
    }
}
