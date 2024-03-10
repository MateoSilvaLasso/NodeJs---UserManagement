import EventModel, {EventInput, EventDocument} from '../models/event.model'


class EventService{

    public async create(userInput: EventInput): Promise<EventDocument> {
        try{
            const event = await EventModel.create(userInput);
            return event;
        }catch(error){
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