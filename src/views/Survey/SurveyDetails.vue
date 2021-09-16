<template>


    <div class="container">
        <div class="jumbotron mt-3">
            <h1 class="mb-5">{{ survey.surveyTopic }}</h1>
            <hr>

            <div v-for="(question, index) in survey.questions" v-bind:key="question.questionId">
                <div class="row">
                    <div class="col">
                        <h4 class="mt-5 mb-3">{{ question.questionText }}</h4>

                        <div v-for="response in question.responses"
                             v-bind:key="response.responseId"
                             class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio"
                                       :value="response.responseId"
                                       :name="index">
                                {{response.responseText}}
                            </label>

                            <mdb-btn color="default" @click.native="subs = true; modalTitle = 'Update Response'; questionIdToUpdate= question.questionId; responseIdToUpdate =response.responseId ">
                                        Update Response
                                    </mdb-btn>
                                    <mdb-btn @click="deleteResponse(question.questionId,response.responseId)" color="red">Delete Response</mdb-btn>

                            
                            <br/>
                        </div>

                        <br/> <br/>

                        <button class="btn btn-primary " @click="subs = true; modalTitle = 'Add Response'; questionIdToUpdate= question.questionId ">
                            Add Response
                        </button>

                        <mdb-btn color="default" @click="subs = true; modalTitle = 'Update Question'; questionIdToUpdate = question.questionId ">
                                    Update Question
                                </mdb-btn>
                                <mdb-btn @click="deleteQuestion(question.questionId)" color="red">Delete Question</mdb-btn>
                                
                        

                        

                    </div>

                    <div class="col">
                        <result-pie :result=result(question) />
                    </div>

                </div>
            </div>

            <mdb-btn color="default" @click.native="subs = true; modalTitle = 'Add Question' ">Add Question</mdb-btn>

            <div>
                <mdb-container>
                    
                    <mdb-modal :show="subs" @close="subs = false">
                        <mdb-modal-header class="text-center">
                            <mdb-modal-title tag="h4" bold class="w-100">{{modalTitle}}</mdb-modal-title>
                        </mdb-modal-header>
                        <mdb-modal-body class="mx-3 grey-text">
                            <div v-if="modalTitle.includes('Response')">
                                <mdb-input label="Response Text" v-model="responseText" class="mb-5"/>    
                            </div>

                            <div v-if="modalTitle.includes('Question')">
                                <mdb-input label="Question Text" v-model="questionText" class="mb-5"/>
                            </div>
                            
                        </mdb-modal-body>
                        <mdb-modal-footer center>
                            <mdb-btn @click.native="subs = false"
                                        @click="handleOperation" color="indigo">
                                {{modalTitle}}
                                <mdb-icon icon="paper-plane" class="ml-1"/>
                            </mdb-btn>
                        </mdb-modal-footer>
                    </mdb-modal>
                </mdb-container>
            </div>

        </div>


    </div>

</template>

<script>
    import axios from 'axios'
    import ResultPie from '../../components/ResultPie.vue'
    import {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbIcon,
        mdbModalTitle,
        mdbModalHeader,
        mdbModalBody,
        mdbInput,
        mdbModalFooter
    } from 'mdbvue';

    export default {

        name: "SurveyDetails",
        components: {
            ResultPie,
            mdbContainer,
            mdbBtn,
            mdbModal,
            mdbIcon,
            mdbModalTitle,
            mdbModalHeader,
            mdbModalBody,
            mdbInput,
            mdbModalFooter
        },
        data() {
            return {

                survey: null,
                subs: false,
                surveyId: this.$route.params.surveyId,
                modalTitle: '',
                questionIdToUpdate: 0,
                responseIdToUpdate: 0,
                questionText: '',
                responseText: ''

            };

        },
        methods: {
            async getSurvey() {
                const response = await axios.get('/survey/' + this.surveyId + '/results');
                this.survey = response.data;
                console.log(response);
            },

            async addResponse() {
                const response = await axios.post('/survey/' + this.surveyId + '/question/' + this.questionIdToUpdate, {
                    responseText: this.responseText
                });
                console.log(response);
                this.getSurvey();
            },

            async deleteResponse(questionId, responseId) {
                const response = await axios.delete('/survey/' + this.surveyId + '/question/' + questionId +'/response/' + responseId);
                console.log(response);
                this.getSurvey();
            },

            async updateResponse() {
                const response = await axios.put('/survey/' + this.surveyId + '/question/' + this.questionIdToUpdate +'/response/' + this.responseIdToUpdate, {
                    responseText: this.responseText
                });
                console.log(response);
                this.getSurvey();
            },

            async addQuestion() {
                const response = await axios.post('/survey/' + this.surveyId + '/question', {
                    questionText: this.questionText
                });
                console.log(response);
                this.getSurvey();
            },

            async updateQuestion() {
                const response = await axios.put('/survey/' + this.surveyId + '/question/' + this.questionIdToUpdate, {
                    questionText: this.questionText
                });
                console.log(response);
                this.getSurvey();
            },

            async deleteQuestion(questionId) {
                const response = await axios.delete('/survey/' + this.surveyId + '/question/' + questionId);
                console.log(response);
                this.getSurvey();
            },

            result(question) {
                const resultList = [];
                question.responses.forEach(response => {
                    resultList.push(response.respondedUsers.length)
                });
                return resultList;
            },

            handleOperation() {
                if (this.modalTitle === "Add Question") {
                    return this.addQuestion();
                } else if (this.modalTitle === "Update Question") {
                    return this.updateQuestion();
                }else if (this.modalTitle === "Add Response") {
                    return this.addResponse();
                } else if (this.modalTitle === "Update Response") {
                    return this.updateResponse();
                }
                return null;
            }

        },

        created() {
            this.getSurvey();

        }
    }
</script>

<style scoped>

</style>