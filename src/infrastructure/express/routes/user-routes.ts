import type { Router, Handler } from 'express';
import {
  makeSignInController,
  makeSignUpController,
} from '@/main/factories/user-factory';

export function userRoutes(router: Router) {
  router.post('/user/sign-up', (request, response) =>
    makeSignUpController().handle(request, response),
  );
  router.post('/user/sign-in', (request, response) =>
    makeSignInController().handle(request, response),
  );
}
