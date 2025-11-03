import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    const secretKey =
      this.config.get<string>('STRIPE_SECRET_KEY') || 'test_key';
    this.stripe = new Stripe(secretKey, {
      // apiVersion: '2024-06-20',
    });
  }

  async createCheckoutSession(
    products: {
      title: string;
      cover: string;
      price: number;
      quantity: number;
    }[],
    orderId,
  ) {
    const lineItems = products.map((p) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.title,
          images: [p.cover],
        },
        unit_amount: Math.round(p.price * 100),
      },
      quantity: p.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.FRONT_SERVER}/success?session_id=${orderId}`,
      cancel_url: 'https://yourdomain.com/cancel',
    });

    return session;
  }
}
