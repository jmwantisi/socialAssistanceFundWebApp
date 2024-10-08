import apiClient from '../../apiClient';

export default class ProgramService {
    constructor() {
        this.API_URL = 'programs';
    }

    async list() {
        try {
            const response = await apiClient.get('programs');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching programs');
        }
    }
}
