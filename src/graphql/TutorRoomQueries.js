import { fetchGraphQl } from "./graphQl"

export const GetTutorWaitingList =  async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            tutormodel {
                waitingtutormodel_set {
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                    }
                }  
            }
        }
    }
    `
    const tutorModel = await fetchGraphQl("tutor's waiting list", "user_by_id", query);
    const parentRoom = await tutorModel.tutormodel.waitingtutormodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
}

export const GetTutorInvitedList =  async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            tutormodel {
                listinvitedtutormodel_set {
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                    }
                }  
            }
        }
    }
    `
    const tutorModel = await fetchGraphQl("tutor's invited list", "user_by_id", query);
    const parentRoom = await tutorModel.tutormodel.listinvitedtutormodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
}

export const GetTutorTryTeachingList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                tryteachingmodel_set {
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                    }
                }  
            }
        }
    }`
    const tutorModel = await fetchGraphQl("tutor's try teaching list", "user_by_id", query);
    const parentRoom = await tutorModel.tutormodel.tryteachingtutormodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
};

export const GetTutorTeachingList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                tutorteachingtutormodel_set {
                    parent_room{
                        id
                        province_code
                        district_code
                        ward_code
                        subject
                        lop
                    }
                }  
            }
        }
    }`
    const tutorModel = await fetchGraphQl("tutor's teaching list", "user_by_id", query);
    const parentRoom = await tutorModel.tutormodel.tutorteachingtutormodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
};
