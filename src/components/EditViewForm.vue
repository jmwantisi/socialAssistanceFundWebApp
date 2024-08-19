<template>
    <div class="columns">
        <div class="column">
            <b-field label="First Name" :type="errors.firstName ? 'is-danger' : ''" message="First name is required.">
                <b-input v-model="applicant.firstName" placeholder="Enter first name" :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Middle Name">
                <b-input v-model="applicant.middleName" placeholder="Enter middle name (optional)"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Last Name" :type="errors.lastName ? 'is-danger' : ''" message="Last name is required.">
                <b-input v-model="applicant.lastName" placeholder="Enter last name" :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Sex" :type="errors.sex ? 'is-danger' : ''" message="Please select a sex.">
                <b-select v-model="applicant.sex" expanded :disabled="isViewing">
                    <option value="">Select a sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </b-select>
            </b-field>

            <b-field label="Date of Birth" :type="errors.dob ? 'is-danger' : ''" message="Date of birth is required.">
                <b-datepicker v-model="dob" placeholder="Click to select..." icon="calendar-today"
                    :disabled="isViewing"></b-datepicker>
            </b-field>

            <b-field label="Application Date" :type="errors.applicationDate ? 'is-danger' : ''"
                message="Application date is required.">
                <b-datepicker v-model="applicationDate" placeholder="Click to select..." icon="calendar-today"
                    :disabled="isViewing"></b-datepicker>
            </b-field>

            <b-field label="Age" :type="errors.age ? 'is-danger' : ''"
                message="Age is required and must be a valid number.">
                <b-input type="number" v-model.number="applicant.age" placeholder="Enter age"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Marital Status" :type="errors.maritalStatus ? 'is-danger' : ''"
                message="Please select a marital status.">
                <b-select v-model="applicant.maritalStatus" expanded :disabled="isViewing">
                    <option value="">Select marital status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </b-select>
            </b-field>

            <b-field label="ID Number" :type="errors.idNumber ? 'is-danger' : ''" message="ID number is required.">
                <b-input v-model="applicant.idNumber" placeholder="Enter ID number" :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="County" :type="errors.countyId ? 'is-danger' : ''" message="Please select a county.">
                <b-select v-model="applicant.countyId" expanded @change="onCountyChange" :disabled="isViewing">
                    <option value="">Select a county</option>
                    <option v-for="county in counties" :key="county.id" :value="county.id">{{ county.name }}</option>
                </b-select>
            </b-field>

            <b-field label="Sub County" :type="errors.subCountyId ? 'is-danger' : ''"
                message="Please select a sub county.">
                <b-select v-model="applicant.subCountyId" expanded :disabled="!applicant.countyId || isViewing"
                    @change="onSubCountyChange">
                    <option value="">Select a sub county</option>
                    <option v-for="subCounty in subCounties" :key="subCounty.id" :value="subCounty.id">{{ subCounty.name
                        }}</option>
                </b-select>
            </b-field>

            <b-field label="Location" :type="errors.locationId ? 'is-danger' : ''" message="Please select a location.">
                <b-select v-model="applicant.locationId" expanded :disabled="!applicant.subCountyId || isViewing"
                    @change="onLocationChange">
                    <option value="">Select a location</option>
                    <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}
                    </option>
                </b-select>
            </b-field>

            <b-field label="Sub Location" :type="errors.subLocationId ? 'is-danger' : ''"
                message="Please select a sub location.">
                <b-select v-model="applicant.subLocationId" expanded :disabled="!applicant.locationId || isViewing"
                    @change="onSubLocationChange">
                    <option value="">Select a sub location</option>
                    <option v-for="subLocation in subLocations" :key="subLocation.id" :value="subLocation.id">{{
                        subLocation.name }}</option>
                </b-select>
            </b-field>

            <b-field label="Village" :type="errors.villageId ? 'is-danger' : ''" message="Please select a village.">
                <b-select v-model="applicant.villageId" expanded :disabled="!applicant.subLocationId || isViewing">
                    <option value="">Select a village</option>
                    <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}
                    </option>
                </b-select>
            </b-field>

            <b-field label="Postal Address Line 1" :type="errors.postalAddress?.addressLine1 ? 'is-danger' : ''"
                message="Postal address line 1 is required.">
                <b-input v-model="applicant.postalAddress.addressLine1" placeholder="Enter postal address line 1"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Postal Address Line 2">
                <b-input v-model="applicant.postalAddress.addressLine2"
                    placeholder="Enter postal address line 2 (optional)" :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Postal Code" :type="errors.postalAddress?.postalCode ? 'is-danger' : ''"
                message="Postal code is required.">
                <b-input v-model="applicant.postalAddress.postalCode" placeholder="Enter postal code"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Street" :type="errors.physicalAddress?.street ? 'is-danger' : ''"
                message="Street is required.">
                <b-input v-model="applicant.physicalAddress.street" placeholder="Enter street"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="City" :type="errors.physicalAddress?.city ? 'is-danger' : ''" message="City is required.">
                <b-input v-model="applicant.physicalAddress.city" placeholder="Enter city"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="House Number" :type="errors.physicalAddress?.houseNumber ? 'is-danger' : ''"
                message="House number is required.">
                <b-input v-model="applicant.physicalAddress.houseNumber" placeholder="Enter house number"
                    :disabled="isViewing"></b-input>
            </b-field>

            <b-field label="Phone Number">
                <b-input v-model="newPhone.phoneNumber" placeholder="Enter phone number"
                    :type="errors.newPhonePhoneNumber ? 'is-danger' : ''" :disabled="isViewing"></b-input>
                <b-select v-model="newPhone.type" expanded :disabled="isViewing">
                    <option value="mobile">Mobile</option>
                    <option value="landline">Landline</option>
                </b-select>
                <b-button @click="addPhone" :disabled="isViewing">Add Phone</b-button>
                <p v-if="errors.newPhonePhoneNumber" class="help is-danger">Phone number is required.</p>
            </b-field>

            <b-field label="Existing Phone Numbers">
                <ul>
                    <li v-for="phone in applicant.telephones" :key="phone.phoneNumber">
                        {{ phone.phoneNumber }} ({{ phone.type }})
                    </li>
                </ul>
            </b-field>

            <b-field label="Applicant Programmes">
                <b-select v-model="newProgramme" expanded :disabled="isViewing">
                    <option value="">Select a programme</option>
                    <option v-for="program in programs" :key="program.id" :value="program">
                        {{ program.name }}
                    </option>
                </b-select>
                <b-button @click="addProgramme" :disabled="isViewing">Add Programme</b-button>
            </b-field>

            <b-field label="Selected Programmes">
                <ul>
                    <li v-for="program in applicant.programmes" :key="program.id">
                        {{ program.name }}
                    </li>
                </ul>
            </b-field>

            <b-field label="Nurse Notes">
                <b-textarea v-model="applicant.nurseNotes" placeholder="Enter notes" :disabled="isViewing"></b-textarea>
            </b-field>

            <b-field label="Status" :type="errors.status ? 'is-danger' : ''" message="Please select a status.">
                <b-select v-model="applicant.status" expanded :disabled="isViewing">
                    <option value="">Select a status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </b-select>
            </b-field>

            <b-button @click="saveApplicant" :disabled="isViewing">Save</b-button>
            <b-button @click="toggleView">{{ isViewing ? 'Edit' : 'View' }}</b-button>
        </div>
    </div>
</template>

<script>
import ApplicantService from '@/services/ApplicantService';
import ProgramService from '@/services/ProgramService';
import AddressService from '@/services/AddressService';
import axios from 'axios';

// Function to convert snake_case to camelCase
const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

const convertKeysToCamelCase = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = toCamelCase(key);
    acc[camelKey] = convertKeysToCamelCase(obj[key]);
    return acc;
  }, {});
};

export default {
  data() {
    return {
      applicationService: null,
      applicant: {
        firstName: '',
        middleName: '',
        lastName: '',
        sex: '',
        dob: '',
        applicationDate: '',
        age: '',
        maritalStatus: '',
        idNumber: '',
        countyId: '',
        subCountyId: '',
        locationId: '',
        subLocationId: '',
        villageId: '',
        postalAddress: {
          addressLine1: '',
          addressLine2: '',
          postalCode: '',
        },
        physicalAddress: {
          street: '',
          city: '',
          houseNumber: '',
        },
        telephones: [],
        programmes: [],
        nurseNotes: '',
        status: '',
      },
      counties: [],
      subCounties: [],
      locations: [],
      subLocations: [],
      villages: [],
      programs: [],
      newPhone: { phoneNumber: '', type: 'mobile' },
      newProgramme: null,
      isViewing: true,
      errors: {},
    };
  },
  methods: {
    async fetchApplicantData() {
      try {
        const id = this.$route.params.id;
        console.log("ID::: ",)
        const response = await this.applicationService.read(id);
        this.applicant = convertKeysToCamelCase(response);
        
        // Set date fields if applicable
        this.dob = new Date(this.applicant.dob);
        this.applicationDate = new Date(this.applicant.applicationDate);
        this.fetchDropdownData();
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    },
    async fetchDropdownData() {
      try {
        const [counties, programs] = await Promise.all([
          axios.get('/api/v1/addresses/counties'),
          axios.get('/api/v1/programmes'),
        ]);

        this.counties = convertKeysToCamelCase(counties.data);
        this.programs = convertKeysToCamelCase(programs.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    },
    async onCountyChange() {
      try {
        const response = await axios.get(`/api/v1/addresses/subcounties?countyId=${this.applicant.countyId}`);
        this.subCounties = convertKeysToCamelCase(response.data);
        this.applicant.subCountyId = '';
        this.applicant.locationId = '';
        this.applicant.subLocationId = '';
        this.applicant.villageId = '';
      } catch (error) {
        console.error('Error fetching sub counties:', error);
      }
    },
    async onSubCountyChange() {
      try {
        const response = await axios.get(`/api/v1/addresses/locations?subCountyId=${this.applicant.subCountyId}`);
        this.locations = convertKeysToCamelCase(response.data);
        this.applicant.locationId = '';
        this.applicant.subLocationId = '';
        this.applicant.villageId = '';
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    async onLocationChange() {
      try {
        const response = await axios.get(`/api/v1/addresses/sublocations?locationId=${this.applicant.locationId}`);
        this.subLocations = convertKeysToCamelCase(response.data);
        this.applicant.subLocationId = '';
        this.applicant.villageId = '';
      } catch (error) {
        console.error('Error fetching sub locations:', error);
      }
    },
    async onSubLocationChange() {
      try {
        const response = await axios.get(`/api/v1/addresses/villages?sublocationId=${this.applicant.subLocationId}`);
        this.villages = convertKeysToCamelCase(response.data);
        this.applicant.villageId = '';
      } catch (error) {
        console.error('Error fetching villages:', error);
      }
    },
    addPhone() {
      if (this.newPhone.phoneNumber) {
        this.applicant.telephones.push({ ...this.newPhone });
        this.newPhone.phoneNumber = '';
        this.newPhone.type = 'mobile';
      } else {
        this.errors.newPhonePhoneNumber = true;
      }
    },
    addProgramme() {
      if (this.newProgramme) {
        this.applicant.programmes.push(this.newProgramme);
        this.newProgramme = null;
      }
    },
    toggleView() {
      this.isViewing = !this.isViewing;
    },
    async saveApplicant() {
      try {
        if (this.isViewing) {
          return;
        }
        const requestData = convertKeysToCamelCase(this.applicant);
        await axios.put('/api/v1/applicant/1', requestData);
        this.isViewing = true;
      } catch (error) {
        console.error('Error saving applicant data:', error);
      }
    },
  },
  created() {
    this.applicationService = new ApplicantService();
    this.fetchApplicantData();
  },
};
</script>

