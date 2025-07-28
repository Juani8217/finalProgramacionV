import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule // Importación necesaria para HttpClient
  ],
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.css']
})
export class CharacterTableComponent implements OnInit {
  private http = inject(HttpClient); // Alternativa moderna a constructor injection

  // URLs de la API
  readonly URL1 = 'https://rickandmortyapi.com/api/character';
  readonly URL2 = 'https://rickandmortyapi.com/api/character/?name=';

  // Datos de personajes
  characters: any[] = [];
  charactersCache: any[] = [];
  
  // Ordenamiento
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Filtros
  filters = {
    status: '',
    gender: '',
    species: '',
    location: ''
  };
  
  // Opciones para los selects
  filterOptions = {
    statuses: ['Alive', 'Dead', 'unknown'] as const,
    genders: ['Female', 'Male', 'Genderless', 'unknown'] as const,
    species: [] as string[],
    locations: [] as string[]
  };

  ngOnInit(): void {
    this.loadCharacters();
  }

  private loadCharacters(sortBy: string | null = null): void {
    this.http.get<{results: any[]}>(this.URL1).subscribe({
      next: (data) => {
        this.charactersCache = data.results || [];
        this.updateFilterOptions();
        this.applyFilters();
        
        if (sortBy) {
          this.sortCharacters(sortBy);
        }
      },
      error: (err) => {
        console.error('Error loading characters:', err);
        this.charactersCache = [];
        this.characters = [];
      }
    });
  }

  private updateFilterOptions(): void {
    this.filterOptions.species = [...new Set(this.charactersCache.map(c => c.species))];
    this.filterOptions.locations = [...new Set(this.charactersCache.map(c => c.location.name))];
  }

  applyFilters(): void {
    this.characters = this.charactersCache.filter(character => {
      return (
        (!this.filters.status || character.status === this.filters.status) &&
        (!this.filters.gender || character.gender === this.filters.gender) &&
        (!this.filters.species || character.species === this.filters.species) &&
        (!this.filters.location || character.location.name === this.filters.location)
      );
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = {
      status: '',
      gender: '',
      species: '',
      location: ''
    };
    this.applyFilters();
  }

  searchCharacterByName(term: string): void {
    const searchTerm = term.trim();
    if (!searchTerm) {
      this.loadCharacters();
      return;
    }

    this.http.get<{results: any[]}>(this.URL2 + encodeURIComponent(searchTerm)).subscribe({
      next: (data) => {
        this.charactersCache = data.results || [];
        this.updateFilterOptions();
        this.applyFilters();
      },
      error: () => {
        this.charactersCache = [];
        this.characters = [];
      }
    });
  }

  sortTable(sortBy: string): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortCharacters(sortBy);
  }

  private sortCharacters(sortBy: string): void {
    this.characters.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  loadLocationDetails(character: any): void {
    this.http.get<any>(`https://rickandmortyapi.com/api/character/${character.id}`).subscribe({
      next: (data) => {
        const foundCharacter = this.characters.find(c => c.id === character.id);
        if (foundCharacter) {
          foundCharacter.locationDetails = data.location;
        }
      },
      error: (err) => {
        console.error('Error loading location details:', err);
      }
    });
  }
}