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
    
          if(args["orientation"]){
            args["lastOrientation"] = args["orientation"];
            args["orientation"] = null;
          }
          var notNull = cleanNullArgs(args);
          try{
            await User.update({id: user.id}, {...notNull});
            const updatedUser = await User.findOne({id: user.id});
            pubSub.publish("driverUpdate",{DriversSubscription: updatedUser});//payload
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