<template>
    <div class="columns">
        <div class="column">
            <b-table :data="applicants" :paginated="isPaginated" :per-page="perPage" :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple" :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection" :pagination-rounded="isPaginationRounded"
                :sort-icon="sortIcon" :sort-icon-size="sortIconSize" default-sort="firstName"
                aria-next-label="Next page" aria-previous-label="Previous page" aria-page-label="Page"
                aria-current-label="Current page" :page-input="hasInput" :pagination-order="paginationOrder"
                :page-input-position="inputPosition" :debounce-page-input="inputDebounce">

                <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="first_name" label="First Name" sortable v-slot="props">
                    {{ props.row.first_name }}
                </b-table-column>

                <b-table-column field="last_name" label="Last Name" sortable v-slot="props">
                    {{ props.row.last_name }}
                </b-table-column>

                <b-table-column field="dob" label="Date of Birth" sortable centered v-slot="props">
                    <span class="tag is-success">
                        {{ new Date(props.row.dob).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column field="status" label="Status" sortable v-slot="props">
                    <span :class="`tag ${getStatusBadgeType(props.row.status)}`">
                        {{ props.row.status }}
                    </span>
                </b-table-column>

                <b-table-column label="Sex" v-slot="props">
                    <span>
                        <b-icon pack="fas" :icon="props.row.sex === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.sex }}
                    </span>
                </b-table-column>

                <b-table-column label="Actions" v-slot="props">
                    <b-button size="is-small" type="is-info" @click="redirectToView(props.row)" :disabled="isViewing">View</b-button>
                    <b-button size="is-small" type="is-danger" @click="deleteApplicant(props.row)">Delete</b-button>
                </b-table-column>

            </b-table>
        </div>
    </div>
</template>


<script>
import ApplicantService from '@/services/ApplicantService';
export default {
    data() {
        return {
            applicants: [],
            isPaginated: true,
            isPaginationSimple: false,
            isPaginationRounded: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 5,
            hasInput: false,
            paginationOrder: '',
            inputPosition: '',
            inputDebounce: 0,
            applicantService: null
        };
    },
    methods: {
        redirectToView(applicant) {
            this.$router.push({ name: 'applicantsView', params: { id: applicant.id } }); // Update with actual ID
        },

        async deleteApplicant(applicant) {
            if (confirm(`Are you sure you want to delete ${applicant.first_name} ${applicant.last_name}?`)) {
                try {
                    await this.applicantService.delete(applicant.id);
                    this.applicants = this.applicants.filter(a => a.id !== applicant.id);
                    console.log(`Applicant ${applicant.first_name} deleted successfully.`);
                } catch (error) {
                    console.error('Error deleting applicant:', error);
                }
            }
        },
        getStatusBadgeType(status) {
            switch (status) {
                case 'Approved':
                    return 'is-success';
                case 'Pending':
                    return 'is-warning';
                case 'Declined':
                    return 'is-danger';
                default:
                    return 'is-light';
            }
        },
    },
    async created() {
        const applicantService = new ApplicantService();
        try {
            const response = await applicantService.list();
            this.applicants = response.content;
        } catch (error) {
            console.error('Error fetching applicants:', error);
        }
    }
};
</script>