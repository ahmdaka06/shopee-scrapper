const readlineSync = require('readline-sync');
const axios = require('axios')

const BASE_URL_API = 'https://shopee.co.id/api/v4'

function formattedTime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
getShopDetail = async (username) => {
    try {
        let request = await axios.get(`${ BASE_URL_API }/shop/get_shop_detail?username=${ username }`)
        let result = request.data.data
        return result
    } catch (error) {
        console.error(error)
    }
}
const resultGetShopDetail = async () => {
    var username = readlineSync.question('Masukkan username toko shopee : ')
    console.log('\n')
    const profile = await getShopDetail(username)
    if (profile) {
        console.log(`==============================`)
        console.log(`Store Name : ${ profile.name }`)
        console.log(`Store Location : ${ profile.shop_location }`)
        console.log(`Store Description :\n${ profile.description }`)
        console.log(`Followers : ${ numberWithCommas(profile.follower_count) } `)
        console.log(`==============================`)
        console.log(`Last Active : ${ formattedTime(profile.last_active_time) }`)
        console.log(`Total Produk : ${ numberWithCommas(profile.item_count) } Item `)
        console.log(`Rating Bad : ${ numberWithCommas(profile.rating_bad) } `)
        console.log(`Rating Normal : ${ numberWithCommas(profile.rating_normal) } `)
        console.log(`Rating Good : ${ numberWithCommas(profile.rating_good) } `)
        console.log(`Rating Star : ${ numberWithCommas(profile.rating_star) } `)
        console.log(`===============================`)
        console.log(`Shop ID : ${ profile.shopid }`)
        console.log(`User ID : ${ profile.userid }`)
    } else {
        console.log('Username tidak di temukan')
    }
}
resultGetShopDetail()