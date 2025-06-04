import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/Authentication/sign-up/sign-up.component';
import { SigninComponent } from './pages/Authentication/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/Authentication/reset-password/reset-password.component';
import { TermsAndPolicyComponent } from './pages/Authentication/terms-and-policy/terms-and-policy.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SiteLayoutComponent } from './Layouts/Site-layout/site-layout/site-layout.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { authServiceGuard } from './Services/AuthServices/auth-service.guard';
import { AppLayoutComponent } from './Layouts/App-layout/app-layout/app-layout.component';
import { UpdatePasswordComponent } from './pages/Authentication/update-password/update-password.component';
import { DashBoardComponent } from './pages/Admin/dash-board/dash-board.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: SiteLayoutComponent,
    //     canActivate: [authServiceGuard],
    //     data: { role: 'user' },
    //     children: [

    //     ],
    // },


    {
        path: 'admin',
        component: SiteLayoutComponent,
        canActivate: [authServiceGuard],
        data: { role: 'admin' },
        children: [
            {
                path: '',
                component: DashBoardComponent
            },

        ],
    },

    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: SigninComponent,
            },
            {
                path: 'signup',
                component: SignUpComponent,
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },
            {
                path: 'terms-and-policy',
                component: TermsAndPolicyComponent
            },
            {
                path: 'update-password',
                component: UpdatePasswordComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },

            {
                path: 'contact-us',
                component: ContactUsComponent,
            },
            {
                path: 'faq',
                component: FaqComponent,
            },
            {
                path: 'about-us',
                component: AboutComponent,
            },
            {
                path: 'details',
                component: OrderPageComponent
            }

        ],
    },

    {
        path: '**',
        redirectTo: '/home',
    },

];
