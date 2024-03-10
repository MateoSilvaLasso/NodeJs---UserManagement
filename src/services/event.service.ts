import EventModel, {EventInput, EventDocument} from '../models/event.model'
import UserModel, {UserDocument} from '../models/user.model'


class EventService{

    public async create(id:any, eventInput: EventInput): Promise<EventDocument> {
        try{
            //console.log(id);
            eventInput.createdBy = id;
            const event = await EventModel.create(eventInput);
            
            const user: UserDocument | null = await UserModel.findById(id);
                if (user) {
                    user.createdEvents.push(event._id);
                    await user.save();
                } else {
                    throw new Error('User not found');
                }
            return event;
        }catch(error){
            throw error;
        }
    }

    public async findDisEvents(): Promise<EventDocument[] | null> {
        try {
            const currentDate = new Date();

            // Consultar los eventos con fecha mayor o igual a la fecha actual
            const events = await EventModel.find({ date: { $gte: currentDate } });

            return events;
        } catch (error) {
            throw error;
        }
    }

    public async findByTitle(title:any): Promise<EventDocument | null>{
        try{
            const event = await EventModel.findOne({title:title});
            return event;
        }catch(error){
            throw error;
        }
    }



    public async findAll(): Promise<EventDocument[]>{
        try {
            const event = await EventModel.find();
            return event
        } catch (error) {
            throw error;
        }
    }

    

    public async findById(id: any): Promise<EventDocument | null>{
        try{
            const user = await EventModel.findById(id)
            return user;
        }catch(error){
            throw error;
        }
    }
    
    public async update(id: string, userInput: EventInput): Promise<EventDocument | null> {
        try{
            const event : EventDocument | null= await EventModel.findOneAndUpdate({_id:id}, userInput,{
                returnOriginal: false
            });
            return event;
        }catch(error){
            throw error;
        }
    }

    public async delete(id: string): Promise<EventDocument | null> {
        try{
            const event : EventDocument | null = await EventModel.findByIdAndDelete({_id:id});
            return event;
        }catch(error){
            throw error;
        }
    }

}


export default new EventService();   