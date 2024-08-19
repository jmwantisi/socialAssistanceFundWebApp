<template>
  <div class="columns">
    <div class="column">
      <b-field label="First Name">
        <b-input v-model="applicant.firstName"></b-input>
      </b-field>

      <b-field label="Middle Name">
        <b-input v-model="applicant.middleName"></b-input>
      </b-field>

      <b-field label="Last Name">
        <b-input v-model="applicant.lastName"></b-input>
      </b-field>

      <b-field label="Sex">
        <b-select v-model="applicant.sex" expanded>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </b-select>
      </b-field>

      <b-field label="Date of Birth">
        <b-datepicker
          v-model="dob"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Application Date">
        <b-datepicker
          v-model="applicationDate"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <b-field label="Age">
        <b-input type="number" v-model.number="applicant.age"></b-input>
      </b-field>

      <b-field label="Marital Status">
        <b-select v-model="applicant.maritalStatus" expanded>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </b-select>
      </b-field>

      <b-field label="ID Number">
        <b-input v-model="applicant.idNumber"></b-input>
      </b-field>

      <b-field label="County">
        <b-select v-model="applicant.countyId" expanded @change="onCountyChange">
          <option v-for="county in counties" :key="county.id" :value="county.id">{{ county.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Sub County">
        <b-select v-model="applicant.subCountyId" expanded :disabled="!applicant.countyId" @change="onSubCountyChange">
          <option v-for="subCounty in subCounties" :key="subCounty.id" :value="subCounty.id">{{ subCounty.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Location">
        <b-select v-model="applicant.locationId" expanded :disabled="!applicant.subCountyId" @change="onLocationChange">
          <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Sub Location">
        <b-select v-model="applicant.subLocationId" expanded :disabled="!applicant.locationId" @change="onSubLocationChange">
          <option v-for="subLocation in subLocations" :key="subLocation.id" :value="subLocation.id">{{ subLocation.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Village">
        <b-select v-model="applicant.villageId" expanded :disabled="!applicant.subLocationId">
          <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}</option>
        </b-select>
      </b-field>

      <b-field label="Postal Address Line 1">
        <b-input v-model="applicant.postalAddress.addressLine1"></b-input>
      </b-field>

      <b-field label="Postal Address Line 2">
        <b-input v-model="applicant.postalAddress.addressLine2"></b-input>
      </b-field>

      <b-field label="Postal Code">
        <b-input v-model="applicant.postalAddress.postalCode"></b-input>
      </b-field>

      <b-field label="Street">
        <b-input v-model="applicant.physicalAddress.street"></b-input>
      </b-field>

      <b-field label="City">
        <b-input v-model="applicant.physicalAddress.city"></b-input>
      </b-field>

      <b-field label="House Number">
        <b-input v-model="applicant.physicalAddress.houseNumber"></b-input>
      </b-field>

      <b-field label="Phone Number">
        <b-input v-model="newPhone.phoneNumber" placeholder="Enter phone number"></b-input>
        <b-select v-model="newPhone.type" expanded>
          <option value="mobile">Mobile</option>
          <option value="landline">Landline</option>
        </b-select>
        <b-button @click="addPhone">Add Phone</b-button>
      </b-field>

      <b-field label="Existing Phone Numbers">
        <ul>
          <li v-for="phone in applicant.telephones" :key="phone.id">
            {{ phone.phoneNumber }} ({{ phone.type }})
          </li>
        </ul>
      </b-field>

      <b-field label="Applicant Programmes">
        <b-input v-model="newProgramme" placeholder="Enter programme ID"></b-input>
        <b-button @click="addProgramme">Add Programme</b-button>
      </b-field>

      <b-field label="Existing Programmes">
        <ul>
          <li v-for="programme in applicant.applicantProgrammes" :key="programme">
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

export default {
  data() {
    return {
      applicantService: null,
      dob: new Date(),
      applicationDate: new Date(),
      applicant: {
        id: null,
        firstName: '',
        middleName: '',
        lastName: '',
        sex: '',
        age: '',
        maritalStatus: '',
        idNumber: '',
        countyId: null,
        subCountyId: null,
        locationId: null,
        subLocationId: null,
        villageId: null,
        postalAddress: {
          id: null,
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
      newProgramme: '',
      counties: [],
      subCounties: [],
      locations: [],
      subLocations: [],
      villages: []
    };
  },
  methods: {
    async submitForm() {
      try {
        const payload = this.convertToSnakeCase(this.applicant);
        const finalPayload = {...payload, dob: this.dob, application_date: this.applicationDate}
        console.log(finalPayload);
        const response = await this.applicantService.create({finalPayload});
        console.log('Applicant created successfully:', response.data);
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
          // Convert Date object to string in 'YYYY-MM-DD' format if necessary
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
          id: this.applicant.telephones.length + 1, // Generate a new ID or use a unique method
          phoneNumber: this.newPhone.phoneNumber,
          type: this.newPhone.type
        });
        this.newPhone.phoneNumber = '';
        this.newPhone.type = 'mobile';
      }
    },
    addProgramme() {
      const programmeId = parseInt(this.newProgramme, 10);
      if (!isNaN(programmeId)) {
        this.applicant.applicantProgrammes.push(programmeId);
        this.newProgramme = '';
      }
    }
  },
  async created() {
    const addresses = new AddressService();
    this.counties = await addresses.getAllCounties();
    this.applicantService = new ApplicantService();
  }
};
</script>

