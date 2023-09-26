import { validationResult } from "express-validator";
import { Plan } from "../models/plan.model.js";
import { Subscription } from "../models/subscription.model.js";
import mongoose from "mongoose";

export const addPlan = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ msg: 'Bad request', msg: errors.array() });
    }
    const { planName, duration, price } = request.body;
    const newPlan = await Plan.create({ planName, duration, price });
    return response.status(200).json({ plan: newPlan, status: true });
  } catch (err) {
    return res.status(500).json({ msg: "plan Added Successfully...", error: 'Internal Server Error', status: false });
  }
}

export const updatePlan = async (request, response, next) => {
  try {
    const { planName, duration, price } = request.body;
    const result = await Plan.findOneAndUpdate(
      { _id: request.body._id },
      { $set: { planName: planName, duration: duration, price: price } },
    );
    if (result == null) {
      return response.status(404).json({ msg: "plan not found", status: false });
    }
    return response.status(200).json({ plan: result, msg: "plan updated successfully......", status: true });
  } catch (err) {
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}


export const removePlan = async (request, response, next) => {
  try {
    const result = await Plan.findOneAndDelete({ _id: request.body._id });
    if (!result) {
      return response.status(404).json({ error: "plan not found", status: false });
    }
    return response.status(200).json({ plan: result, msg: "plan removed successfully......", status: true });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}


export const subscribePlan = async (request, response, next) => {
  try {
    const { restaurantId, planId, startingDate, endingDate } = request.body;
    const plan = await Plan.findById({ _id: planId });
    if (!plan) {
      return response.status(404).json({ error: "Restaurant not found", status: false });
    }
    const subscription = await Subscription.create({ restaurantId, planId, startingDate, endingDate });
    return response.status(200).json({ result: subscription, status: true });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const planList = async (request, response, next) => {
  try {
    let page = parseInt(request.query.page) || 1;
    const plans = await Plan.find().skip((page - 1) * 5).limit(5);
    let subscription;
    if (!plans.length)
      return response.status(404).json({ error: "Plans not found", status: false });
    const updatedPlans = await Promise.all(
      plans.map(async (plan) => {
        const subscriptions = await Subscription.find({
          planId: plan._id,
        }).count();
        return { ...plan.toObject(), subscriptions };
      })
    );
    return response.status(200).json({ result: updatedPlans, status: true });
  }
  catch (err) {
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const countOfSubscription = async (request, response, next) => {
  try {
    const subscription = await Subscription.find({ planId: request.body.planId });
    if (!subscription) {
      return response.status(404).json({ status: false });
    }
    return response.status(200).json({ result: subscription.length, status: true });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

/* export const list = (request,response,next)=>{
    let page = parseInt(request.query.page) || 1;
    let perPage = 10;
    Product.find().skip((page-1)*10).limit(10).
    then(result=>{
        return response.status(200).json({products: result, status: true});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error", status: false});
    })
} */

