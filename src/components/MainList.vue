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

                <b-table-column label="sex" v-slot="props">
                    <span>
                        <b-icon pack="fas" :icon="props.row.sex === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.sex }}
                    </span>
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
            applicants: [
                { id: 1, first_name: 'John', last_name: 'Doe', dob: '1990-01-01', sex: 'Male' },
                { id: 2, first_name: 'Jane', last_name: 'Smith', dob: '1992-05-15', sex: 'Female' },
            ],
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
    async created() {
        const applicantService = new ApplicantService();
        const response = await applicantService.list();
        this.applicant = response.content;
        console.log("Applicant:: ", this.applicant)
    }
};
</script>