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

            
            const events = await EventModel.find({ date: { $gte: currentDate } });
            return events;
        } catch (error) {
            throw error;
        }
    }

    public async findDisDateEvents(date: Date): Promise<EventDocument[] | null> {
        try {
            
            const currentDate = new Date();
    
            
            const events = await EventModel.find({
                $and: [
                    { date: { $gte: currentDate } }, 
                    {date:date}
                ]
            });
            
            
            return events;
        } catch (error) {
            throw error;
        }
    }
    
    public async findDisPlaceEvents(place:string): Promise<EventDocument[] | null> {
        try {
            
            const currentDate = new Date();
    
            
            const events = await EventModel.find({
                $and: [
                    { date: { $gte: currentDate } }, 
                    {place:place}
                ]
            });
            
            
            return events;
        } catch (error) {
            throw error;
        }
    }

    public async findDisTypeEvents(type:string): Promise<EventDocument[] | null> {
        try {
            
            const currentDate = new Date();
    
            
            const events = await EventModel.find({
                $and: [
                    { date: { $gte: currentDate } }, 
                    {title:type}
                ]
            });
            
            
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

    public async getAttendees(eventId: string): Promise<UserDocument[]> {
        try {
            const event = await EventModel.findById<EventDocument>(eventId).populate('attendees').exec();
            if (!event) {
                throw new Error('Event not found');
            }
            const attendees: UserDocument[] = event.attendees as UserDocument[];
            return attendees;
        } catch (error) {
            throw error;
        }
    };

}


export default new EventService();   