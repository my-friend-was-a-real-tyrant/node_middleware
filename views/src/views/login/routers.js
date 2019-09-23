const routers = [
    {
        path: '/',
        redirect: '/index'
    },{
        path: '/index',
        component(resolve) {
            require.ensure(['./contains/index.vue'], () => {
                resolve(require('./contains/index.vue'));
            });
        }
    },{
        path: '/choosePark',
        component(resolve) {
            require.ensure(['./contains/choosePark.vue'], () => {
                resolve(require('./contains/choosePark.vue'));
            });
        },
        redirect: '/choosePark/park',
        children: [
            {
                path: 'park',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/park.vue'], () => {
                        resolve(require('publicContains/choosePark/park.vue'));
                    });
                }
            },{
                path: 'build',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/build.vue'], () => {
                        resolve(require('publicContains/choosePark/build.vue'));
                    });
                }
            },{
                path: 'room',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/room.vue'], () => {
                        resolve(require('publicContains/choosePark/room.vue'));
                    });
                }
            }
        ]
    },{
        path: '/apply',
        component(resolve) {
            require.ensure(['./contains/apply.vue'], () => {
                resolve(require('./contains/apply.vue'));
            });
        }
    },{
        path: '/welcome',
        component(resolve) {
            require.ensure(['./contains/welcome.vue'], () => {
                resolve(require('./contains/welcome.vue'));
            });
        }
    },{
        path: '/error',
        component(resolve) {
            require.ensure(['./contains/error.vue'], () => {
                resolve(require('./contains/error.vue'));
            });
        }
    },{
        path: '/inviteCode',
        component(resolve) {
            require.ensure(['./contains/inviteCode.vue'], () => {
                resolve(require('./contains/inviteCode.vue'));
            });
        }
    },{
        path: '*',
        redirect: '/'
    }
];

export default routers;