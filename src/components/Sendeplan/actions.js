/*
 *
 * Sendeplan actions
 *
 */

 import {
   LOAD_SENDEPLAN_PENDING,
   LOAD_SENDEPLAN_SUCCESS,
   LOAD_SENDEPLAN_FAILED,
 } from './constants';

 export function loadSendeplan(year, month, day, weekDay) {
   return {
     type: LOAD_SENDEPLAN_PENDING,
     year,
     month,
     day,
     weekDay,
   };
 }

 export function sendeplanSuccess(sendeplan, weekDay) {
   return {
     type: LOAD_SENDEPLAN_SUCCESS,
     sendeplan,
     weekDay,
   };
 }

 export function sendeplanError() {
   return {
     type: LOAD_SENDEPLAN_FAILED,
   };
 }
