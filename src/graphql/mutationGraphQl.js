import { endpoint } from "namespace";

export const CreateParentRoom = async ({roomInfo}) => {
    const {day_can_teach, subject, lop, other_require, province_code, district_code, ward_code, detail_location, time_in_one_day, money_per_day, type_teacher, sex_of_teacher} = roomInfo;
    const mutation = `
    mutation {
        create_parent_room(input_fields: 
            {
                day_can_teach: [${day_can_teach}], 
                detail_location: "${detail_location}", 
                district_code: ${district_code}, 
                lop: ${lop}, 
                other_require: "${other_require}", 
                province_code: ${province_code}, 
                subject: "${subject}", 
                ward_code: ${ward_code}
                prices: [
                {
                    money_per_day: ${money_per_day},
                    time_in_one_day: ${time_in_one_day},
                    type_teacher: ["${type_teacher}"],
                    sex_of_teacher: ["${sex_of_teacher}"]
                },]
            }){
                parent_room{
                    id
                    province_code
                    district_code
                    ward_code
                    detail_location
                    subject
                    lop
                    day_can_teach
                    other_require
                    pricemodel_set {
                        money_per_day
                        time_in_one_day
                        type_teacher
                        sex_of_teacher
                    }  
                }
            }
    }
    `
    try {
        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: mutation})
        });
        return true;
    } catch(error) {
        console.log("Failed to create parent room: ",error);
        return false;
    }
}

export const addToApplyList = async ({parentRoomId}) => {
    const mutation = `
    mutation {
        create_waiting_tutor(input_fields: {
          id_parent_room: ${parentRoomId}
        }) {
          waiting_tutor {
            id
            tutor {
              id
              user {
                  id
                username
                imageprivateusermodel {
                    avatar
                } 
              }
              first_name
              last_name 
              province_code
              district_code
              ward_code
              profession
              number_phone
              number_teaching
              birthday
              university
            }
          }
        }
      }
    `
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: mutation})
        });
        const responseJSON = await response.json();
        return responseJSON.data.create_waiting_tutor.waiting_tutor;
    } catch(error) {
        console.log("Failed to apply parent room", error);
    }
}

export const addToTeachingList = async ({id}) => {
    const mutation = `
    mutation {
        create_tutor_teaching(input_fields: {
            id_waiting_list: ${id}
        }) 
        {
            tutor_teaching {
                id
                tutor {
                    id
                    user {
                        id
                        username
                        imageprivateusermodel {
                            avatar
                        } 
                    }
                    first_name
                    last_name 
                    province_code
                    district_code
                    ward_code
                    profession
                    number_teaching
                    birthday
                    university
                }
            }
        }
      }
    `
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: mutation})
        });
        const responseJSON = await response.json();
        return responseJSON.data.create_tutor_teaching.tutor_teaching;
    } catch(error) {
        console.log("Failed to apply teaching list", error);
        return false;
    }
}