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
          // console.log("HHere0");
          // console.log(req);
          const user: User = req.user;
          // console.log("HHere");
          // console.log(user);
          const notNull = cleanNullArgs(args);
          try{
            // console.log(pubSub);
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