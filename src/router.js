import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Surveys from './components/Surveys.vue'
import Survey from './components/Survey.vue'
import SurveyDetails from './components/SurveyDetails.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ForgotPass from './components/ForgotPass.vue'
import ResetPass from './components/ResetPass.vue'
import NonActiveSurveys from './components/NonActiveSurveys.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/survey', name: 'Surveys', component: Surveys},
        {path: '/survey/:surveyId', name: 'Survey', component: Survey},
        {path: '/survey/:surveyId/details', name: 'SurveyDetails', component: SurveyDetails},
        {path: '/survey/nonactives', name: 'NonActiveSurveys', component: NonActiveSurveys},
        {path: '/login', name: 'Login', component: Login},
        {path: '/register', name: 'Register', component: Register},
        {path: '/forgot_password', name: 'ForgotPass', component: ForgotPass},
        {path: '/reset_password/:token', name: 'ResetPass', component: ResetPass}
    ]
})
