import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn
} from "typeorm";
import { verificationTarget } from "src/types/types";

@Entity()
class Verification extends BaseEntity{
    @PrimaryGeneratedColumn() id: number

    @Column({type:"text", enum: ["PHONE","EMAIL"]})
    target: verificationTarget;

    @Column({type:"text"})
    payload: string;
    @Column({type:"text"})
    key: string;

    @Column({type: "boolean", default: false})
    used: boolean;

    @CreateDateColumn() createdAt: string;
    @CreateDateColumn() updatedAt: string;
}


export default Verification