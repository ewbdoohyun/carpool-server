import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { 
  ReportMovementResponse, 
  ReportMovementMutationArgs } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async(
        _,
        args: ReportMovementMutationArgs,
        {req, pubSub}
        ): Promise<ReportMovementResponse> => {
          const user: User = req.user;
          if(args["lat"]){
            args["lastLat"] = args["lat"];
            args["lat"] = null;              
          }
          if(args["lng"]){
            args["lastLng"] = args["lng"];
            args["lng"] = null;  
          }
          var notNull = cleanNullArgs(args);
          try{
            await User.update({id: user.id}, {...notNull});
            pubSub.publish("driverUpdate",{DriversSubscription: user});//payload
            return {
              ok: true,
              error: null
            }
          }catch(error){
            return {
              ok: false,
            error: error.message
            }
          }
        })
  }
}
export default resolvers;