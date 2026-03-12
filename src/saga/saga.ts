import { type CallEffect, type PutEffect } from 'redux-saga/effects'


export type SagaGenerator<T = void> = Generator<CallEffect | PutEffect, T, unknown>


export type SagaError = Error | string