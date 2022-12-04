const auth = {
    init(base) {
        return {
            createUser(data) {
                return base.post('/auth/user/create-user', null, data);
            },
            createRoutes(data) {
                return base.post('/auth/routes/create-new-route', null, data);
            },
            getAllRoutes() {
                return base.get('/auth/routes/get-all-routes');
            },
            updateRouteById(RouteId, data) {
                return base.post(
                    `/auth/routes/update-route-by-id/`,
                    {
                        id: RouteId,
                    },
                    data,
                );
            },
            createRegion(data) {
                return base.post('/auth/regions/create-new-region', null, data);
            },
            getAllRegions() {
                return base.get('/auth/regions/get-all-regions');
            },
            updateRegionById(RegionId, data) {
                return base.post(
                    `/auth/regions/update-region-by-id/`,
                    {
                        id: RegionId,
                    },
                    data,
                );
            },
            createNewPass(data) {
                return base.post('/auth/passes/create-new-pass', null, data);
            },
            getAllPasses() {
                return base.get('/auth/passes/get-all-passes');
            },
            checkPassValidity(id) {
                return base.get(`/auth/passes/check-pass-validity`, {
                    id: id,
                });
            },
            deleteRegionById(id){
                return base.delete(`/auth/regions/delete-region-by-id`, {
                    id: id,
                });
            },
            deleteRouteById(id){
                return base.delete(`/auth/routes/delete-route-by-id`, {
                    id: id,
                });
            }
        };
    },
};

export default auth;
