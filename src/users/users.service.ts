import { Injectable, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { unlink } from 'fs';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});

    if (users) {
      return users;
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { apply: true },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async updateImage(id: string, res: Response, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    const image = `images/${file.filename}`;

    if (image) {
      unlink(`${process.cwd()}/uploads/${user.image}`, (err) => {
        if (err) console.log(err);
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { image },
    });

    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (updatedUser) {
      return updatedUser;
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({ where: { id } });

    if (deletedUser) {
      return { message: 'User has been deleted!' };
    } else {
      throw new ForbiddenException();
    }
  }
}
