export const user_token = localStorage.getItem('user_token')

export const sortData = (data, property, proviso) => {
    try {
        if (proviso === true) {
            function compare(a, b) {
                const data_idA = a[property].toString().toLowerCase()
                const data_idB = b[property].toString().toLowerCase()

                let comparison = 0;
                if (data_idA < data_idB) {
                    comparison = 1;
                } else if (data_idA > data_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_data = data.sort(compare)
            return sort_data
        }
        else {
            function compare(a, b) {
                const data_idA = a[property].toString().toLowerCase()
                const data_idB = b[property].toString().toLowerCase()

                let comparison = 0;
                if (data_idA > data_idB) {
                    comparison = 1;
                } else if (data_idA < data_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_data = data.sort(compare)
            return sort_data
        }
    }
    catch (error) {
        console.log("sortData", error)
    }

}

export const status_item = data => {
    let return_data;
    switch (data) {
        case 1:
            return_data = 'ติดตั้ง';
            break;
        case 2:
            return_data = 'พร้อมใช้งาน';
            break;
        case 3:
            return_data = 'ส่งซ่อม';
            break;
        case 4:
            return_data = 'เสีย';
            break;
    }
    return return_data;
};

export const status_item_color = data => {
    let return_data;
    switch (data) {
        case 1:
            return_data = 'text-primary';
            break;
        case 2:
            return_data = 'text-success';
            break;
        case 3:
            return_data = 'text-warning';
            break;
        case 4:
            return_data = 'text-danger';
            break;
    }
    return return_data;
};