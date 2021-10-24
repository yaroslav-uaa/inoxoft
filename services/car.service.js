const Car = require('../model/Cars');

module.exports = {
    findAll: async (query = {}) => {
        const {
            perPage = 30,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const yearFilter = {};

        Object.keys(filters).forEach(key => {
            switch (key) {
                case 'brand':
                    filterObject.brand = filters.brand;
                    break;
                case 'model':
                    filterObject.model = {
                        $regex: `^${filters.model}`,
                        $options: 'gi',
                    };
                    break;
                case 'year.gte':
                    Object.assign(yearFilter, { $gte: +filters['year.gte'] });
                    break;
                case 'year.lte':
                    Object.assign(yearFilter, { $lte: +filters['year.lte'] });
                    break;
            }
        });

        if (Object.keys(yearFilter).length) {
            filterObject.year = yearFilter;
        }

        const cars = await Car.find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const count = await Car.countDocuments(filterObject);

        return {
            data: cars,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage),
        };
    },
};
