declare const appSettings: any;
 
/** Get webAPI from appSettings */
export const GetAppSettings = <T>(environment: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION'): T => {
    let webAPI: any = {};

    switch(environment) { 
        case 'DEVELOPMENT': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.development || null },
                environment: {
                    info: environment,
                    isDevelopment: true,
                    isStaging: false,
                    isProduction: false
                }
            });
        break;

        case 'STAGING': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.staging || null },
                environment: {
                    info: environment,
                    isDevelopment: false,
                    isStaging: true,
                    isProduction: false
                }
            });
        break;

        case 'PRODUCTION': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.production || null }, 
                environment: { 
                    info: environment,
                    isDevelopment: false,
                    isStaging: false,
                    isProduction: true
                }
            });
        break;
    } 

    return {
        appInfo: {
            id: 0,
            project: '',
            title: 'COER 91',
            storage: 'coer91',
            version: '0.0.0',
            ...appSettings.appInfo
        },
        ...webAPI,
        dateTime: {
            format: 'MDY',
            ...appSettings.dateTime
        },
        navigation: {
            static: true,
            useHash: true,
            ...appSettings.navigation
        }
    } 
}