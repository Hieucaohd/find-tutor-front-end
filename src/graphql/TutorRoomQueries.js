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
    const parentRoom = await tutorModel?.tutormodel.waitingtutormodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
}

export const GetTutorInvitedList =  async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            tutormodel {
                listinvitedmodel_set {
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
    console.log('model tutor', tutorModel)
    const parentRoom = await tutorModel.tutormodel.listinvitedmodel_set.map((item) => {
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
    const parentRoom = await tutorModel?.tutormodel.tryteachingmodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
};

export const GetTutorTeachingList = async (id) => {
    const query = ` 
    {
        user_by_id(id: ${id}){
            tutormodel {
                tutorteachingmodel_set {
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
    const parentRoom = await tutorModel?.tutormodel.tutorteachingmodel_set.map((item) => {
        return item.parent_room;
    });
    return parentRoom;
};
