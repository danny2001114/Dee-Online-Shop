import { defineStore } from "pinia";

type WalletState = {
  amount: number
  isAnimating: boolean
  animationInterval: number | null
}

export const useWallet = defineStore("wallet", {
  state(): WalletState {
    return {
      amount: 0,
      isAnimating: true,
      animationInterval: 100
    }
  },

  getters: {
    formattedAmount: (state) => state.amount.toLocaleString()
  },

  actions: {
    setAmount(value: number): void {
      this.amount = value
    },
    subtract(value: number): void {
      this.animateTo(this.amount - value)
    },
    add(value: number): void {
      this.animateTo(this.amount + value)
    },
    multiply(value: number): void {
      this.animateTo(this.amount * value)
    },
    divide(value: number): void {
      this.animateTo(this.amount / value)
    },
    reset(): void {
      this.stopAnimation();
      this.amount = 0
    },
    stopAnimation(): void {
      if (this.animationInterval !== null) {
        clearInterval(this.animationInterval)
        this.animationInterval = null
      }
      this.isAnimating = false
    },
    animateTo(target: number, duration = 1000): void {
      this.stopAnimation()

      if (target === this.amount) {
        this.setAmount(target)
        return
      }

      const stepTime = 10
      const steps = Math.max(Math.ceil(duration / stepTime), 1)
      const diff = target - this.amount
      const increment = diff / steps
      let currentStep = 0

      this.isAnimating = true
      this.animationInterval = window.setInterval(() => {
        currentStep += 1
        this.amount += increment

        const reachedTarget = diff > 0 ? this.amount >= target : this.amount <= target
        if (currentStep >= steps || reachedTarget) {
          this.setAmount(target)
          this.stopAnimation()
        }
      }, stepTime)
    }
  }
})
