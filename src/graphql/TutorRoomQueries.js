import { fetchGraphQl } from "./graphQl"

export const GetTutorWaitingList =  async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            tutormodel {
                waitingtutormodel_set {
                    id
                    parent_room {
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                        }
                    }
                }  
            }
        }
    }
    `
    const tutorModel = await fetchGraphQl("tutor's waiting list", "user_by_id", query);
    const parentRoom = await tutorModel?.tutormodel.waitingtutormodel_set.map((item) => {
        return {...item.parent_room, roomId: item.parent_room.id, id: item.id};
    });
    return parentRoom;
}

export const GetTutorInvitedList =  async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            tutormodel {
                listinvitedmodel_set {
                    id
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                        }
                    }
                }  
            }
        }
    }
    `
    const tutorModel = await fetchGraphQl("tutor's invited list", "user_by_id", query);
    const parentRoom = await tutorModel?.tutormodel.listinvitedmodel_set.map((item) => {
        return {...item.parent_room, roomId: item.parent_room.id, id: item.id};
    });
    return parentRoom;
}

export const GetTutorTryTeachingList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                tryteachingmodel_set {
                    id
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                          }
                    }
                }  
            }
        }
    }`
    const tutorModel = await fetchGraphQl("tutor's try teaching list", "user_by_id", query);
    const parentRoom = await tutorModel?.tutormodel.tryteachingmodel_set.map((item) => {
        return {...item.parent_room, roomId: item.parent_room.id, id: item.id};
    });
    return parentRoom;
};

export const GetTutorTeachingList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                tutorteachingmodel_set {
                    id
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                          }
                    }
                }  
            }
        }
    }`
    const tutorModel = await fetchGraphQl("tutor's teaching list", "user_by_id", query);
    const parentRoom = await tutorModel?.tutormodel.tutorteachingmodel_set.map((item) => {
        return {...item.parent_room, roomId: item.parent_room.id, id: item.id};
    });
    return parentRoom;
};

export const getTutorRoomList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                waitingtutormodel_set {
                    id
                    parent_room {
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        create_at
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                        }
                    }
                } 
                tutorteachingmodel_set {
                    id
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                        number_waiting
                        create_at
                        pricemodel_set {
                            money_per_day
                            time_in_one_day
                            type_teacher
                            sex_of_teacher
                          }
                    }
                }  
            }
        }
    }`
    const parentRoom = await fetchGraphQl("tutor's teaching list", "user_by_id", query);
    return parentRoom.tutormodel;
}
