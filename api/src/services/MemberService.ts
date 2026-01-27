import appDataSource from "../data-source";
import { Member } from "../entities/Member";

export class MemberService {
  memberRepository = appDataSource.getRepository(Member);

  // recupérer membre d'une residence
  getAllByResidence(residenceId: number) {
    return this.memberRepository.find({
      where: { residence: { id: residenceId } },
      relations: ["residence"],
      order: { lastName: "ASC" },
    });
  }

  // modification profil
  update(id: number, data: Partial<Member>) {
    return this.memberRepository.update(id, data);
  }

  // suppression profil
  delete(id: number) {
    return this.memberRepository.delete(id);
  }

   // suppression membre
  getById(id: number) {
    return this.memberRepository.findOne({
      where: { id },
      relations: ["residence"],
    });
  }
}
