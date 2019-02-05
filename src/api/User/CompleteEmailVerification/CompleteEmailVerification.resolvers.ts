import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import User from "../../../entities/User";
import { CompleteEmailVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async(
        _,
        args,
        {req}
        ): Promise<CompleteEmailVerificationResponse> =>{
      const user: User = req.user;
      const {key} = args;
      if(user.email){
        try{
          const verification = await Verification.findOne({ 
            key, 
            payload: user.email 
          });
          if(verification){
            user.verifiedEmail = true;
            user.save();
            return {
              ok: true,
              error: null
            }
          }else{
            return {
              ok: false,
              error: "Can't verify email"
            }
          }
        }catch(error){
          return {
            ok:false,
            error: error.message
          }
        }
      }else{
        return {
          ok:false,
          error: "No email to verify"
        }
      }
    })
  }
}