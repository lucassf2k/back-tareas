import { v7 } from 'uuid';
import { Task } from '@/domain/task';

describe('Task', () => {
  test('it should be possible to create a user with id', () => {
    const newTask = Task.create(
      'Fazer o trabalho de Programação',
      'Responder as questões da atividade 02',
    );
    expect(newTask.id).toHaveLength(v7().length);
    expect(newTask).toHaveProperty('title');
    expect(newTask).toHaveProperty('description');
    expect(newTask).toHaveProperty('isCompleted');
    expect(newTask).toHaveProperty('createdAt');
  });

  test('should return false in isCompleted when creating a new TASK', () => {
    const newTask = Task.create(
      'Fazer o trabalho de Programação',
      'Responder as questões da atividade 02',
    );
    expect(newTask.isCompleted).toBeFalsy();
  });

  test('it should be possible to change the TASK completion status', () => {
    const newTask = Task.create(
      'Fazer o trabalho de Programação',
      'Responder as questões da atividade 02',
    );
    expect(newTask.isCompleted).toBeFalsy();
    newTask.taskCompletionToggle();
    expect(newTask.isCompleted).toBeTruthy();
    newTask.taskCompletionToggle();
    expect(newTask.isCompleted).toBeFalsy();
  });

  test('it should be possible to modify the title, description and isCompleted fields of a TASK', () => {
    const newTask = Task.create(
      'Fazer o trabalho de Programação',
      'Responder as questões da atividade 02',
    );
    newTask.title = 'Finalizar o trabalho de Programação Distribuída';
    newTask.description = 'Criar o modulo de autenticação';
    newTask.taskCompletionToggle();
    expect(newTask.title).toBe(
      'Finalizar o trabalho de Programação Distribuída',
    );
    expect(newTask.description).toBe('Criar o modulo de autenticação');
    expect(newTask.isCompleted).toBeTruthy();
  });
});
