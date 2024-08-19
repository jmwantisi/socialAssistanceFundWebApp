<template>
  <div class="columns">
    <div class="column">
      <b-field label="First Name" :type="errors.firstName ? 'is-danger' : ''" message="First name is required.">
        <b-input v-model="applicant.firstName" placeholder="Enter first name"></b-input>
      </b-field>

      <b-field label="Middle Name">
        <b-input v-model="applicant.middleName" placeholder="Enter middle name (optional)"></b-input>
      </b-field>

      <b-field label="Last Name" :type="errors.lastName ? 'is-danger' : ''" message="Last name is required.">
        <b-input v-model="applicant.lastName" placeholder="Enter last name"></b-input>
      </b-field>

      <b-field label="Sex" :type="errors.sex ? 'is-danger' : ''" message="Please select a sex.">
        <b-select v-model="applicant.sex" expanded>
          <option value="">Select a sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </b-select>
      </b-field>

      <b-field label="Date of Birth" :type="errors.dob ? 'is-danger' : ''" message="Date of birth is required.">
        <b-datepicker
          v-model="dob"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Application Date" :type="errors.applicationDate ? 'is-danger' : ''" message="Application date is required.">
        <b-datepicker
          v-model="applicationDate"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Marital Status" :type="errors.maritalStatus ? 'is-danger' : ''" message="Please select a marital status.">
        <b-select v-model="applicant.maritalStatus" expanded>
          <option value="">Select marital status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </b-select>
      </b-field>

      <b-field label="ID Number" :type="errors.idNumber ? 'is-danger' : ''" message="ID number is required.">
        <b-input v-model="applicant.idNumber" placeholder="Enter ID number"></b-input>
      </b-field>

      <b-field label="County" :type="errors.countyId ? 'is-danger' : ''" message="Please select a county.">
        <b-select v-model="applicant.countyId" expanded @change="onCountyChange">
          <option value="">Select a county</option>
          <option v-for="county in counties" :key="county.id" :value="county.id">{{ county.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Sub County" :type="errors.subCountyId ? 'is-danger' : ''" message="Please select a sub county." >
        <b-select v-model="applicant.subCountyId" expanded :disabled="!applicant.countyId" @change="onSubCountyChange">
          <option value="">Select a sub county</option>
          <option v-for="subCounty in subCounties" :key="subCounty.id" :value="subCounty.id">{{ subCounty.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Location" :type="errors.locationId ? 'is-danger' : ''" message="Please select a location.">
        <b-select v-model="applicant.locationId" expanded :disabled="!applicant.subCountyId" @change="onLocationChange">
          <option value="">Select a location</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Sub Location" :type="errors.subLocationId ? 'is-danger' : ''" message="Please select a sub location.">
        <b-select v-model="applicant.subLocationId" expanded :disabled="!applicant.locationId" @change="onSubLocationChange">
          <option value="">Select a sub location</option>
          <option v-for="subLocation in subLocations" :key="subLocation.id" :value="subLocation.id">{{ subLocation.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Village" :type="errors.villageId ? 'is-danger' : ''" message="Please select a village.">
        <b-select v-model="applicant.villageId" expanded :disabled="!applicant.subLocationId">
          <option value="">Select a village</option>
          <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Postal Address Line 1" :type="errors.postalAddress.addressLine1 ? 'is-danger' : ''" message="Postal address line 1 is required.">
        <b-input v-model="applicant.postalAddress.addressLine1" placeholder="Enter postal address line 1"></b-input>
      </b-field>

      <b-field label="Postal Address Line 2">
        <b-input v-model="applicant.postalAddress.addressLine2" placeholder="Enter postal address line 2 (optional)"></b-input>
      </b-field>

      <b-field label="Postal Code" :type="errors.postalAddress.postalCode ? 'is-danger' : ''" message="Postal code is required.">
        <b-input v-model="applicant.postalAddress.postalCode" placeholder="Enter postal code"></b-input>
      </b-field>

      <b-field label="Street" :type="errors.physicalAddress.street ? 'is-danger' : ''" message="Street is required.">
        <b-input v-model="applicant.physicalAddress.street" placeholder="Enter street"></b-input>
      </b-field>

      <b-field label="City" :type="errors.physicalAddress.city ? 'is-danger' : ''" message="City is required.">
        <b-input v-model="applicant.physicalAddress.city" placeholder="Enter city"></b-input>
      </b-field>

      <b-field label="House Number" :type="errors.physicalAddress.houseNumber ? 'is-danger' : ''" message="House number is required.">
        <b-input v-model="applicant.physicalAddress.houseNumber" placeholder="Enter house number"></b-input>
      </b-field>

      <b-field label="Phone Number">
        <b-input v-model="newPhone.phoneNumber" placeholder="Enter phone number" :type="errors.newPhonePhoneNumber ? 'is-danger' : ''"></b-input>
        <b-select v-model="newPhone.type" expanded>
          <option value="mobile">Mobile</option>
          <option value="landline">Landline</option>
        </b-select>
        <b-button @click="addPhone">Add Phone</b-button>
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
        <b-select v-model="newProgramme" expanded>
          <option value="">Select a programme</option>
          <option v-for="program in programs" :key="program.id" :value="program">
            {{ program.name }}
          </option>
        </b-select>
        <b-button @click="addProgramme">Add Programme</b-button>
      </b-field>

      <b-field label="Selected Programmes">
        <ul>
          <li v-for="programme in displayProgrammesNames" :key="programme">
            {{ programme }}
          </li>
        </ul>
      </b-field>

      <b-button type="is-primary" @click="submitForm">Submit Application</b-button>
    </div>
  </div>
</template>


<script>
import AddressService from '@/services/AddressService';
import ApplicantService from '@/services/ApplicantService';
import ProgramService from '@/services/ProgramService';

export default {
  computed: {
    dobToString() {
      return this.dob ? this.dob.toISOString().split('T')[0] : '';
    },
    applicationDateToString() {
      return this.applicationDate ? this.applicationDate.toISOString().split('T')[0] : '';
    }
  },
  data() {
    return {
      applicantService: null,
      dob: '',
      applicationDate: '',
      errors: {
        firstName: '',
        lastName: '',
        sex: '',
        dob: '',
        applicationDate: '',
        maritalStatus: '',
        idNumber: '',
        countyId: '',
        subCountyId: '',
        locationId: '',
        subLocationId: '',
        villageId: '',
        postalAddress: {
          addressLine1: '',
          addressLine2: ''
        },
        physicalAddress: {
          addressLine1: ''
        }
      },
      applicant: {
        id: null,
        firstName: '',
        middleName: '',
        lastName: '',
        sex: '',
        maritalStatus: '',
        idNumber: '',
        countyId: null,
        subCountyId: null,
        locationId: null,
        subLocationId: null,
        villageId: null,
        postalAddress: {
          addressLine1: '',
          addressLine2: '',
          postalCode: ''
        },
        physicalAddress: {
          id: null,
          street: '',
          city: '',
          houseNumber: ''
        },
        telephones: [],
        applicantProgrammes: []
      },
      newPhone: {
        phoneNumber: '',
        type: 'mobile'
      },
      newProgramme: null,
      counties: [],
      subCounties: [],
      locations: [],
      subLocations: [],
      villages: [],
      programs: [],
      displayProgrammesNames: []
    };
  },
  methods: {
    validateForm() {
      const errors = {};

      if (!this.applicant.firstName) errors.firstName = true;
      if (!this.applicant.lastName) errors.lastName = true;
      if (!this.applicant.sex) errors.sex = true;
      if (!this.dob) errors.dob = true;
      if (!this.applicationDate) errors.applicationDate = true;
      if (!this.applicant.maritalStatus) errors.maritalStatus = true;
      if (!this.applicant.idNumber) errors.idNumber = true;
      if (!this.applicant.countyId) errors.countyId = true;
      if (!this.applicant.subCountyId) errors.subCountyId = true;
      if (!this.applicant.locationId) errors.locationId = true;
      if (!this.applicant.subLocationId) errors.subLocationId = true;
      if (!this.applicant.villageId) errors.villageId = true;
      if (!this.applicant.postalAddress.addressLine1) errors.postalAddress = { addressLine1: true };
      if (!this.applicant.postalAddress.postalCode) errors.postalAddress = { ...errors.postalAddress, postalCode: true };
      if (!this.applicant.physicalAddress.street) errors.physicalAddress = { street: true };
      if (!this.applicant.physicalAddress.city) errors.physicalAddress = { ...errors.physicalAddress, city: true };
      if (!this.applicant.physicalAddress.houseNumber) errors.physicalAddress = { ...errors.physicalAddress, houseNumber: true };
      if (this.newPhone.phoneNumber && !this.applicant.telephones.some(phone => phone.phoneNumber === this.newPhone.phoneNumber)) errors.newPhonePhoneNumber = true;
      
      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) return;

      try {
        const payload = this.convertToSnakeCase(this.applicant);
        const finalPayload = {
          ...payload,
          dob: this.dobToString,
          application_date: this.applicationDateToString
        };
        console.log(finalPayload);
        const response = await this.applicantService.create(finalPayload);
        console.log('Applicant created successfully:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    convertToSnakeCase(obj) {
      const snakeCaseObj = {};

      for (const [key, value] of Object.entries(obj)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          snakeCaseObj[snakeKey] = this.convertToSnakeCase(value);
        } else if (Array.isArray(value)) {
          snakeCaseObj[snakeKey] = value.map(item =>
            typeof item === 'object' ? this.convertToSnakeCase(item) : item
          );
        } else {
          snakeCaseObj[snakeKey] = value instanceof Date
            ? value.toISOString().split('T')[0]
            : value;
        }
      }

      return snakeCaseObj;
    },
    async onCountyChange() {
      const addresses = new AddressService();
      this.subCounties = await addresses.getSubCountiesByCountyId(this.applicant.countyId);
      this.resetSelections('subCountyId', 'locationId', 'subLocationId', 'villageId');
    },
    async onSubCountyChange() {
      const addresses = new AddressService();
      this.locations = await addresses.getLocationsBySubCountyId(this.applicant.subCountyId);
      this.resetSelections('locationId', 'subLocationId', 'villageId');
    },
    async onLocationChange() {
      const addresses = new AddressService();
      this.subLocations = await addresses.getSubLocationsByLocationId(this.applicant.locationId);
      this.resetSelections('subLocationId', 'villageId');
    },
    async onSubLocationChange() {
      const addresses = new AddressService();
      this.villages = await addresses.getVillagesBySubLocationId(this.applicant.subLocationId);
      this.resetSelections('villageId');
    },
    resetSelections(...fields) {
      fields.forEach(field => {
        this.applicant[field] = null;
      });
    },
    addPhone() {
      if (this.newPhone.phoneNumber) {
        this.applicant.telephones.push({
          phoneNumber: this.newPhone.phoneNumber,
          type: this.newPhone.type
        });
        this.newPhone.phoneNumber = '';
        this.newPhone.type = 'mobile';
      }
    },
    addProgramme() {
      const programmeId = parseInt(this.newProgramme.id, 10);
      if (!isNaN(programmeId)) {
        this.applicant.applicantProgrammes.push(this.newProgramme.id);
        this.displayProgrammesNames.push(this.newProgramme.name);
        this.newProgramme = null;
      }
    }
  },

  async created() {
    const addresses = new AddressService();
    this.counties = await addresses.getAllCounties();
    this.applicantService = new ApplicantService();
    const programService = new ProgramService();
    this.programs = await programService.list();
  }
};
</script>
