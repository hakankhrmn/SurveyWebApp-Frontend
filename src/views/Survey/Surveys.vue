<template>

    <div class="container">

        <h1 class="text-center">Survey List </h1>
        <br/>
        <mdb-input label="Search Surveys" type="text" class="active-pink active-pink-2 mt-0 mb-3" v-model="search"/>
        <br/>
        <mdb-tbl striped>
            <mdb-tbl-head color="black" textWhite>
                <tr>
                    <th>Survey Topic</th>
                    <th>Show Results and Details</th>
                    <th>Response Survey</th>
                    <th>Update Survey</th>
                    <th>Delete Survey</th>
                <tr/>
            </mdb-tbl-head>
            <mdb-tbl-body>
                <tr v-for="survey in filteredSurveys" v-bind:key="survey.surveyId">
                    <td> {{survey.surveyTopic}}</td>
                    <td>
                        <mdb-btn color="blue" @click="detailsSurvey(survey.surveyId)">Show Results and Details</mdb-btn>
                    </td>
                    <td>
                        <mdb-btn color="blue" @click="responseSurvey(survey.surveyId)">Response Survey</mdb-btn>
                    </td>
                    <td>
                        <mdb-btn color="green"
                                 @click.native="subs = true; surveyIdToUpdate = survey.surveyId; modalTitle = 'Update' ">
                            Update Survey
                        </mdb-btn>
                    </td>
                    <td>
                        <mdb-btn color="red" @click="deleteSurvey(survey.surveyId)">Delete Survey</mdb-btn>
                    </td>
                </tr>
            </mdb-tbl-body>
        </mdb-tbl>

        <div>
            <mdb-container>
                <mdb-btn color="default" @click.native="subs = true; modalTitle = 'Add' ">Add Survey</mdb-btn>
                <mdb-modal :show="subs" @close="subs = false">
                    <mdb-modal-header class="text-center">
                        <mdb-modal-title tag="h4" bold class="w-100">{{modalTitle}} Survey</mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body class="mx-3 grey-text">
                        <mdb-input label="Survey Topic" v-model="surveyTopic" class="mb-5"/>
                    </mdb-modal-body>
                    <mdb-modal-footer center>
                        <mdb-btn @click.native="subs = false; surveyIdToUpdate=survey.surveyId"
                                 @click="handleOperation(surveyIdToUpdate)" color="indigo">{{modalTitle}}
                            <mdb-icon icon="paper-plane" class="ml-1"/>
                        </mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>
            </mdb-container>
        </div>


        <mdb-btn color="default" @click.native="showNonActiveSurveys">Show Non-Active Surveys</mdb-btn>


    </div>
</template>

<script>
    import {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbIcon,
        mdbModalTitle,
        mdbModalHeader,
        mdbModalBody,
        mdbInput,
        mdbModalFooter,
        mdbTbl,
        mdbTblHead,
        mdbTblBody
    } from 'mdbvue';
    import axios from "axios";

    export default {
        name: 'Surveys',

        components: {
            mdbContainer,
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalBody,
            mdbInput,
            mdbModalFooter,
            mdbIcon,
            mdbTbl,
            mdbTblHead,
            mdbTblBody,
            mdbModalTitle
        },

        data() {
            return {
                subs: false,
                surveys: [],
                surveyTopic: '',
                surveyIdToUpdate: 0,
                search: '',
                modalTitle: ''
            }
        },

        methods: {

            getSurveys() {
                axios.get('/survey').then((response) => {
                    this.surveys = response.data;
                })
            },

            async addSurvey() {
                const response = await axios.post('/survey', {
                    surveyTopic: this.surveyTopic
                });
                console.log(response);
                this.getSurveys();
            },

            async updateSurvey(surveyId) {
                const response = await axios.put('/survey/' + surveyId, {
                    surveyTopic: this.surveyTopic
                });
                console.log(response);
                this.getSurveys();
            },

            async deleteSurvey(surveyId) {
                const response = await axios.delete('/survey/' + surveyId);
                console.log(response);
                this.getSurveys();
            },

            async responseSurvey(surveyId) {
                this.$router.push('/survey/' + surveyId)
            },

            async showNonActiveSurveys() {
                this.$router.push('/nonactives');
            },

            async detailsSurvey(surveyId) {
                this.$router.push('/survey/' + surveyId + '/details')
            },

            handleOperation(surveyId) {
                if (this.modalTitle === "Add") {
                    return this.addSurvey();
                } else if (this.modalTitle === "Update") {
                    return this.updateSurvey(surveyId);
                }
                return null;
            }
        },

        created() {
            this.getSurveys();
        },

        computed: {
            filteredSurveys() {
                return this.surveys.filter((survey) => {
                    return survey.surveyTopic.match(this.search);
                });
            }
        }


    }
</script>
