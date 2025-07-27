import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/prismaClient";

class MemberRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findOrCreateMember(){

  }
}

const memberRepository = new MemberRepository(prisma);

export { memberRepository, MemberRepository };
