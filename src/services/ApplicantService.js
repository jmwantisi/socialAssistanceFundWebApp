import apiClient from '../../apiClient';

// CRUD
export default class ApplicantService {

    async create(userData) {
        try {
            const response = await apiClient.post('/applicants', userData);
            return response.data;
        } catch (error) {
            console.error("Error::: ",error)
            throw new Error('Error creating applicant');
        }
    }

    async list() {
        try {
            const response = await apiClient.get('/applicants');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching applicants');
        }
    }

    async read(id) {
        try {
            const response = await apiClient.get(`/applicants/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching applicant with ID: ${id}`);
        }
    }

    async update(id, userData) {
        try {
            const response = await apiClient.put(`/applicants/${id}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating user with ID: ${id}`);
        }
    }

    async delete(id) {
        try {
            const response = await apiClient.delete(`/applicants/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting applicant with ID: ${id}`);
        }
    }
}

