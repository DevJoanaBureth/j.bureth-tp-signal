import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-productivity-tracker.component',
  styleUrl: './productivity-tracker.component.css',
  templateUrl: './productivity-tracker.component.html',
})
export class ProductivityTrackerComponent {
  protected readonly DAILY_GOAL: number = 5;

  protected completedTasks: WritableSignal<number> = signal<number>(
    Number(localStorage.getItem('tasks')) || 0,
  );

  protected progressPercentage: Signal<number> = computed(
    () => (this.completedTasks() / this.DAILY_GOAL) * 100,
  );

  protected message = computed(() => {
    const pourcentage = this.progressPercentage();
    if (pourcentage === 0) return 'Prêt à démarrer la journée ?';
    if (pourcentage < 100) return 'Continuez comme ça, vous y êtes presque !';
    return 'Félicitations, objectif atteint ! 🚀';
  });

  constructor() {
    effect(() => {
      const tasks = this.completedTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));

      if (tasks >= this.DAILY_GOAL) {
        window.alert('Bravo, vous avez fini votre journée !');
      }
    });
  }

  addTask() {
    this.completedTasks.update((n) => n + 1);
  }

  reset() {
    this.completedTasks.set(0);
  }
}
