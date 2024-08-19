<template>
    <div class="columns">
      <div class="column">
        <b-field grouped group-multiline>
          <b-select v-model="defaultSortDirection">
            <option value="asc">Sort direction: ASC</option>
            <option value="desc">Sort direction: DESC</option>
          </b-select>
          
          <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </b-select>
          
          <div class="control">
            <b-button label="Set page to 2" :disabled="!isPaginated" @click="currentPage = 2" />
          </div>
          
          <div class="control is-flex">
            <b-switch v-model="isPaginated">Paginated</b-switch>
          </div>
          
          <div class="control is-flex">
            <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
          </div>
          
          <div class="control is-flex">
            <b-switch v-model="isPaginationRounded" :disabled="!isPaginated">Rounded pagination</b-switch>
          </div>
          
          <b-select v-model="paginationPosition" :disabled="!isPaginated">
            <option value="bottom">Bottom pagination</option>
            <option value="top">Top pagination</option>
            <option value="both">Both</option>
          </b-select>
          
          <b-select v-model="sortIcon">
            <option value="arrow-up">Arrow sort icon</option>
            <option value="menu-up">Caret sort icon</option>
            <option value="chevron-up">Chevron sort icon</option>
          </b-select>
          
          <b-select v-model="sortIconSize">
            <option value="is-small">Small sort icon</option>
            <option value="">Regular sort icon</option>
            <option value="is-medium">Medium sort icon</option>
            <option value="is-large">Large sort icon</option>
          </b-select>
          
          <b-select v-model="paginationOrder">
            <option value="">Default pagination order</option>
            <option value="is-centered">Centered pagination</option>
            <option value="is-right">Right pagination</option>
          </b-select>
          
          <div class="control is-flex">
            <b-switch v-model="hasInput">Page Input</b-switch>
          </div>
          
          <b-select v-model="inputPosition">
            <option value="">Default input position</option>
            <option value="is-input-right">Input right</option>
            <option value="is-input-left">Input left</option>
          </b-select>
          
          <b-input type="number" placeholder="Debounce (milliseconds)" v-model="inputDebounce" min="0"></b-input>
        </b-field>
      </div>
    </div>
  
    <div class="columns">
      <div class="column">
        <b-table
          :data="applicants"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :pagination-rounded="isPaginationRounded"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          default-sort="firstName"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          :page-input="hasInput"
          :pagination-order="paginationOrder"
          :page-input-position="inputPosition"
          :debounce-page-input="inputDebounce"
        >
          <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
            {{ props.row.id }}
          </b-table-column>
  
          <b-table-column field="firstName" label="First Name" sortable v-slot="props">
            {{ props.row.firstName }}
          </b-table-column>
  
          <b-table-column field="lastName" label="Last Name" sortable v-slot="props">
            {{ props.row.lastName }}
          </b-table-column>
  
          <b-table-column field="dob" label="Date of Birth" sortable centered v-slot="props">
            <span class="tag is-success">
              {{ new Date(props.row.dob).toLocaleDateString() }}
            </span>
          </b-table-column>
  
          <b-table-column label="Gender" v-slot="props">
            <span>
              <b-icon pack="fas" :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
              </b-icon>
              {{ props.row.gender }}
            </span>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        applicants: [
          { id: 1, firstName: 'John', lastName: 'Doe', dob: '1990-01-01', gender: 'Male' },
          { id: 2, firstName: 'Jane', lastName: 'Smith', dob: '1992-05-15', gender: 'Female' },
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
      };
    },
  };
  </script>