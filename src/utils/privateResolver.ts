
const privateResolver = resolverFunction => async (
  parent, 
  args, 
  context, 
  info) =>{
    console.log("Hee");
    console.log(context);
    console.log(context.req);
  if(!context.req || !context.req.user){
    throw new Error("No JWT. I refuse to proceed");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
}

export default privateResolver;