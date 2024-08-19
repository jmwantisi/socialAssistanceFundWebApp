<template>
  <div class="columns">
    <div class="column">
      <b-field label="First Name" :type="errors.firstName ? 'is-danger' : ''" :message="errors.firstName">
        <b-input v-model="applicant.firstName"></b-input>
      </b-field>

      <b-field label="Middle Name">
        <b-input v-model="applicant.middleName"></b-input>
      </b-field>

      <b-field label="Last Name" :type="errors.lastName ? 'is-danger' : ''" :message="errors.lastName">
        <b-input v-model="applicant.lastName"></b-input>
      </b-field>

      <b-field label="Sex" :type="errors.sex ? 'is-danger' : ''" :message="errors.sex">
        <b-select v-model="applicant.sex" expanded>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </b-select>
      </b-field>

      <b-field label="Date of Birth" :type="errors.dob ? 'is-danger' : ''" :message="errors.dob">
        <b-datepicker
          v-model="dob"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Application Date" :type="errors.applicationDate ? 'is-danger' : ''" :message="errors.applicationDate">
        <b-datepicker
          v-model="applicationDate"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Marital Status" :type="errors.maritalStatus ? 'is-danger' : ''" :message="errors.maritalStatus">
        <b-select v-model="applicant.maritalStatus" expanded>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </b-select>
      </b-field>

      <b-field label="ID Number" :type="errors.idNumber ? 'is-danger' : ''" :message="errors.idNumber">
        <b-input v-model="applicant.idNumber"></b-input>
      </b-field>

      <b-field label="County" :type="errors.countyId ? 'is-danger' : ''" :message="errors.countyId">
        <b-select v-model="applicant.countyId" expanded @change="onCountyChange">
          <option v-for="county in counties" :key="county.id" :value="county.id">{{ county.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Sub County" :type="errors.subCountyId ? 'is-danger' : ''" :message="errors.subCountyId">
        <b-select v-model="applicant.subCountyId" expanded :disabled="!applicant.countyId" @change="onSubCountyChange">
          <option v-for="subCounty in subCounties" :key="subCounty.id" :value="subCounty.id">{{ subCounty.name }}</option>
        </b-select>
      </b-field>

      <!-- More fields below with validations added similarly -->

      <b-button type="is-primary" @click="submitForm">Submit Application</b-button>
    </div>
  </div>
</template>

<script>
import AddressService from '@/services/AddressService';
import ApplicantService from '@/services/ApplicantService';

export default {
  data() {
    return {
      applicantService: null,
      dob: new Date(),
      applicationDate: new Date(),
      applicant: {
        firstName: '',
        middleName: '',
        lastName: '',
        sex: '',
        maritalStatus: '',
        idNumber: '',
        countyId: null,
        subCountyId: null,
        // Other fields...
      },
      errors: {},
      counties: [],
      subCounties: [],
      // Other data properties...
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.applicant.firstName) this.errors.firstName = 'First name is required';
      if (!this.applicant.lastName) this.errors.lastName = 'Last name is required';
      if (!this.applicant.sex) this.errors.sex = 'Sex is required';
      if (!this.dob) this.errors.dob = 'Date of birth is required';
      if (!this.applicationDate) this.errors.applicationDate = 'Application date is required';
      if (!this.applicant.maritalStatus) this.errors.maritalStatus = 'Marital status is required';
      if (!this.applicant.idNumber) this.errors.idNumber = 'ID number is required';
      if (!this.applicant.countyId) this.errors.countyId = 'County is required';
      if (!this.applicant.subCountyId) this.errors.subCountyId = 'Sub County is required';

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) {
        console.error('Form validation failed:', this.errors);
        return;
      }

      try {
        const payload = this.convertToSnakeCase(this.applicant);
        const finalPayload = {...payload, dob: this.dob, application_date: this.applicationDate};
        console.log(finalPayload);
        const response = await this.applicantService.create({finalPayload});
        console.log('Applicant created successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    // Other methods like onCountyChange, onSubCountyChange, etc.
  },
  async created() {
    const addresses = new AddressService();
    this.counties = await addresses.getAllCounties();
    this.applicantService = new ApplicantService();
  }
};
</script>
