import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Surveys from './views/Survey/Surveys.vue'
import Survey from './views/Survey/Survey.vue'
import SurveyDetails from './views/Survey/SurveyDetails.vue'
import Login from './views/Auth/Login.vue'
import Register from './views/Auth/Register.vue'
import ForgotPass from './views/Auth/ForgotPass.vue'
import ResetPass from './views/Auth/ResetPass.vue'
import NonActiveSurveys from './views/Survey/NonActiveSurveys.vue'

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
