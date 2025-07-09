import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.example.rental.service.ConflictResolver;
import java.time.LocalDate;

public class ConflictResolverTest {

    private ConflictResolver conflictResolver;

    @BeforeEach
    public void setUp() {
        conflictResolver = new ConflictResolver();
    }

    @Test
    public void testNoConflictWhenDatesDoNotOverlap() {
        LocalDate startDate1 = LocalDate.of(2023, 10, 1);
        LocalDate endDate1 = LocalDate.of(2023, 10, 5);
        LocalDate startDate2 = LocalDate.of(2023, 10, 6);
        LocalDate endDate2 = LocalDate.of(2023, 10, 10);

        assertFalse(conflictResolver.hasConflict(startDate1, endDate1, startDate2, endDate2));
    }

    @Test
    public void testConflictWhenDatesOverlap() {
        LocalDate startDate1 = LocalDate.of(2023, 10, 1);
        LocalDate endDate1 = LocalDate.of(2023, 10, 5);
        LocalDate startDate2 = LocalDate.of(2023, 10, 4);
        LocalDate endDate2 = LocalDate.of(2023, 10, 10);

        assertTrue(conflictResolver.hasConflict(startDate1, endDate1, startDate2, endDate2));
    }

    @Test
    public void testConflictWhenDatesTouch() {
        LocalDate startDate1 = LocalDate.of(2023, 10, 1);
        LocalDate endDate1 = LocalDate.of(2023, 10, 5);
        LocalDate startDate2 = LocalDate.of(2023, 10, 5);
        LocalDate endDate2 = LocalDate.of(2023, 10, 10);

        assertFalse(conflictResolver.hasConflict(startDate1, endDate1, startDate2, endDate2));
    }
}