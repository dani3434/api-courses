import { randomUUID } from 'node:crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectdOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at: new Date();
    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at,
      },
    ];
    expectdOutputCourses = {
      id,
      name: 'teste',
      description: 'teste description',
      created_at,
      tags: expectOutputTags,
    };

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectdOutputCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'teste',
      description: 'teste description',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectdOutputCourses).toStrictEqual(newCourse);
  });

  it('should list all course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectdOutputCourses).toStrictEqual(courses);
  });

  it('should find one course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectdOutputCourses).toStrictEqual(course);
  });

  it('should update a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'teste',
      description: 'teste description',
      tags: ['nestjs'],
    };

    const updateCourse = await service.update(id, updateCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectdOutputCourses).toStrictEqual(updateCourse);
  });

  it('should delete a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.remove(id);

    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectdOutputCourses).toStrictEqual(course);
  });
});
