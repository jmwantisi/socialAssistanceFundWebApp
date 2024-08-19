import apiClient from '../../apiClient';

export default class AddressService {
    baseUrl = "addresses";

    async getAllCounties() {
        try {
            const response = await apiClient.get(`${this.baseUrl}/counties`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching counties');
        }
    }

    async getCountyById(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/counties/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching counties with ID: ${id}`);
        }
    }

    async getSubCountiesByCountyId(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/counties/${id}/subcounties`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-counties with County ID: ${id}`);
        }
    }

    async getAllLocations() {
        try {
            const response = await apiClient.get(`${this.baseUrl}/locations`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching locations');
        }
    }

    async getLocationById(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/locations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching location with ID: ${id}`);
        }
    }

    // New function to get locations by sub-county ID
    async getLocationsBySubCountyId(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/subcounties/${id}/locations`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations for sub-county ID: ${id}`);
        }
    }

    async getSubLocationsByLocationId(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/locations/${id}/sublocations`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-locations for location ID: ${id}`);
        }
    }

    async getAllSubLocations() {
        try {
            const response = await apiClient.get(`${this.baseUrl}/sublocations`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching sub-locations');
        }
    }

    async getSubLocationById(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/sublocations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching sub-location with ID: ${id}`);
        }
    }

    async getVillagesBySubLocationId(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/sublocations/${id}/villages`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching villages for sub-location ID: ${id}`);
        }
    }

    async getAllVillages() {
        try {
            const response = await apiClient.get(`${this.baseUrl}/villages`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching villages');
        }
    }

    async getVillageById(id) {
        try {
            const response = await apiClient.get(`${this.baseUrl}/villages/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching village with ID: ${id}`);
        }
    }
}
